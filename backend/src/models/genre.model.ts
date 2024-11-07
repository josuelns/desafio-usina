import { IGenres, CreateGenreParams, DeleteGenreParams, GetGenreByIdParams, UpdateGenreParams } from '../types/genre.type';
import { query } from './db';

export const getAllGenres = async (): Promise<IGenres[]> => {
    const result = await query('SELECT * FROM genres');
    return result.rows;
};

export const getGenreById = async ({ id }: GetGenreByIdParams): Promise<IGenres | null> => {
    const result = await query('SELECT * FROM genres WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const createGenre = async ({ name }: CreateGenreParams): Promise<IGenres> => {
    const result = await query(
        `INSERT INTO genres (name, created_at, updated_at) 
         VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
         RETURNING *`,
        [name]
    );
    return result.rows[0];
};

export const updateGenre = async ({ id, name }: UpdateGenreParams): Promise<IGenres | null> => {
    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }

    
    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    if (fields.length === 0) return null;
    values.push(id);

    const queryText = `UPDATE genres SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    const result = await query(queryText, values);

    return result.rows[0] || null;
};

export const deleteGenre = async ({ id }: DeleteGenreParams): Promise<boolean> => {
    const result = await query('DELETE FROM genres WHERE id = $1 RETURNING id', [id]);
    return result.rowCount !== null && result.rowCount > 0;
};
