import { QueryResult } from 'pg';
import {
  IMovies,
  CreateMovieParams,
  DeleteMovieParams,
  GetMovieByIdParams,
  UpdateMovieParams,
  MovieSortOption,
  GetMovieByOrderParams,
  GetMovieByFilterParams
} from '../types/movie.type';
import { IUsers } from '../types/user.type';
import { query } from './db';

const buildSortQuery = (sortOption: MovieSortOption): string => {
  switch (sortOption) {
    case MovieSortOption.HIGHEST_RATED:
      return `ORDER BY COALESCE(SUM(r.rating) / NULLIF(COUNT(DISTINCT r.user_id), 0), 0) DESC`;
    case MovieSortOption.LATEST:
      return `ORDER BY m.created_at DESC, m.id DESC`;
    case MovieSortOption.ALPHABETICAL:
      return `ORDER BY m.title ASC`;
    case MovieSortOption.LAST_REVIEWED:
      return `ORDER BY MAX(r.created_at) DESC`; // Usando MAX para pegar a última data de revisão
    default:
      return '';
  }
};

export const getAllMovies = async (): Promise<IMovies[]> => {
  const result = await query(`
    SELECT 
      m.id,
      m.title,
      m.description,
      m.release_year,
      m.duration,
      m.thumb,
      COALESCE(SUM(r.rating) / NULLIF(COUNT(DISTINCT r.user_id), 0), 0) AS average,  -- Média ponderada
      COUNT(DISTINCT r.user_id) AS total_users,  -- Número de usuários únicos que avaliaram
      g.name AS genre_name,
      m.created_at,
      m.updated_at
    FROM 
      movies m
    LEFT JOIN 
      reviews r ON m.id = r.movie_id  
    LEFT JOIN 
      genres g ON m.id_genre = g.id 
    GROUP BY 
      m.id, g.id, r.id 
  `);

  return result.rows;
};

export const getAllMoviesByOrder = async ({ order }: GetMovieByOrderParams): Promise<IMovies[]> => {
  const sortOption = order || MovieSortOption.LATEST;

  const sortQuery = buildSortQuery(sortOption);

  const result = await query(`
    SELECT 
      m.id,
      m.title,
      m.description,
      m.release_year,
      m.duration,
      m.thumb,
      COALESCE(SUM(r.rating) / NULLIF(COUNT(DISTINCT r.user_id), 0), 0) AS average,  -- Média ponderada
      COUNT(DISTINCT r.user_id) AS total_users,  -- Número de usuários únicos que avaliaram
      g.name AS genre_name,
      m.created_at,
      m.updated_at,
      MAX(r.created_at) AS last_reviewed -- Pegando a data da última avaliação
    FROM 
      movies m
    LEFT JOIN 
      reviews r ON m.id = r.movie_id
    LEFT JOIN 
      genres g ON m.id_genre = g.id
    GROUP BY 
      m.id, g.name
    ${sortQuery}
  `);

  return result.rows;
};


export const getMovieById = async ({ id }: GetMovieByIdParams): Promise<IMovies | null> => {
  const result = await query(`
    SELECT 
      m.id,
      m.title,
      m.description,
      m.release_year,
      m.duration,
      m.thumb,
      COALESCE(SUM(r.rating) / NULLIF(COUNT(DISTINCT r.user_id), 0), 0) AS average,  -- Média ponderada
      COUNT(DISTINCT r.user_id) AS total_users,  -- Número de usuários únicos que avaliaram
      g.name AS genre_name,
      m.created_at,
      m.updated_at
    FROM 
      movies m
    LEFT JOIN 
      reviews r ON m.id = r.movie_id 
    LEFT JOIN 
      genres g ON m.id_genre = g.id  
    WHERE 
      m.id = $1  
    GROUP BY 
      m.id, g.name  
  `, [id]);

  return result.rows[0] || null;
};

export const getMovieByFilter = async ({
  id,
  title,
  release_year,
  id_genre,
  min_rating,
  max_rating,
  id_user,
  order,
}: GetMovieByFilterParams): Promise<(Partial<IMovies> & { user: Partial<IUsers> })[] | null> => {
  const sortOption = order || MovieSortOption.LATEST; // Default to 'LATEST' if no order is specified
  const sortQuery = buildSortQuery(sortOption);  // Função externa para criar a string de ordenação

  let queryText = `
    SELECT 
      m.id,
      m.title,
      m.description,
      m.release_year,
      m.duration,
      m.thumb,
      m.created_at,
      m.updated_at,
      g.name AS genre_name,
      COALESCE(SUM(r.rating) / NULLIF(COUNT(DISTINCT r.user_id), 0), 0) AS average,  -- Média ponderada
      COUNT(DISTINCT r.user_id) AS total_users,  -- Número de usuários únicos que avaliaram
      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email,
      u.thumb AS user_thumb,
      u.created_at AS user_created_at,
      u.updated_at AS user_updated_at
    FROM 
      movies m
    LEFT JOIN 
      reviews r ON m.id = r.movie_id 
    LEFT JOIN 
      genres g ON m.id_genre = g.id
    LEFT JOIN
      users u ON m.id_user = u.id 
    WHERE 1 = 1
  `;

  const values: (string | number)[] = [];  // Tipagem correta para os valores
  let index = 1;

  // Função para adicionar filtros de forma dinâmica
  const addFilter = (condition: string, value: string | number) => {
    queryText += ` AND ${condition}`;
    values.push(value);
    index++;
  };

  // Aplicando filtros dinamicamente
  if (id) addFilter('m.id = $' + index, id);
  if (title) addFilter('m.title ILIKE $' + index, `%${title}%`);
  if (release_year) addFilter('m.release_year = $' + index, release_year);
  if (id_genre) addFilter('g.id = $' + index, id_genre);
  if (min_rating) addFilter('r.rating >= $' + index, min_rating);
  if (max_rating) addFilter('r.rating <= $' + index, max_rating);
  if (id_user) addFilter('m.id_user = $' + index, id_user);

  // A cláusula GROUP BY precisa incluir todas as colunas de movies e users que não são agregadas
  queryText += ` GROUP BY 
    m.id, g.name, u.id 
    ${sortQuery}
  `;

  console.log(queryText)

  // Executando a consulta
  const result: QueryResult<any> = await query(queryText, values);

  // Se houver resultados, mapeamos
  if (result.rows.length > 0) {
    return result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      release_year: row.release_year,
      duration: row.duration,
      thumb: row.thumb,
      weighted_average: row.average,  // Ajuste para usar o campo 'average' calculado no SELECT
      total_users: row.total_users,
      genre_name: row.genre_name,
      created_at: row.created_at,
      updated_at: row.updated_at,
      id_genre: row.id_genre,  // Adicionando o campo id_genre ao resultado
      id_user: row.id_user,    // Adicionando o campo id_user ao resultado
      user: {
        id: row.user_id,
        name: row.user_name,
        email: row.user_email,
        thumb: row.user_thumb,
        created_at: row.user_created_at,
        updated_at: row.user_updated_at,
      },
    }));
  }

  return null;
};


export const createMovie = async ({
  title,
  description,
  release_year,
  duration,
  id_genre,
  id_user,
  thumb
}: CreateMovieParams): Promise<IMovies> => {
  const result = await query(`
    INSERT INTO movies (title, description, release_year, duration, id_genre, id_user, thumb, created_at, updated_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
    RETURNING *`,
    [title, description, release_year, duration, id_genre, id_user, thumb]
  );
  return result.rows[0];
};

export const updateMovie = async ({
  id,
  title,
  description,
  release_year,
  duration,
  id_genre,
  thumb
}: UpdateMovieParams): Promise<IMovies | null> => {
  const fields = [];
  const values = [];
  let index = 1;

  if (title) {
    fields.push(`title = $${index++}`);
    values.push(title);
  }
  if (description) {
    fields.push(`description = $${index++}`);
    values.push(description);
  }
  if (release_year) {
    fields.push(`release_year = $${index++}`);
    values.push(release_year);
  }
  if (duration) {
    fields.push(`duration = $${index++}`);
    values.push(duration);
  }
  if (id_genre) {
    fields.push(`id_genre = $${index++}`);
    values.push(id_genre);
  }
  if (thumb) {
    fields.push(`thumb = $${index++}`);
    values.push(thumb);
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);

  if (fields.length === 0) return null;
  values.push(id);

  const queryText = `UPDATE movies SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
  const result = await query(queryText, values);

  return result.rows[0] || null;
};

export const deleteMovie = async ({ id }: DeleteMovieParams): Promise<boolean> => {
  const result = await query('DELETE FROM movies WHERE id = $1 RETURNING id', [id]);
  return Boolean(result?.rowCount && result.rowCount > 0);
};
