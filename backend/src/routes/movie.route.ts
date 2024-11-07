import { Router } from 'express';
import * as movieController from '../controllers/movie.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Obtém todos os filmes
 *     description: Retorna uma lista de todos os filmes.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de filmes encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: 'The Shawshank Redemption'
 *                   description:
 *                     type: string
 *                     example: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
 *                   release_year:
 *                     type: integer
 *                     example: 1994
 *                   duration:
 *                     type: integer
 *                     example: 142
 *                   id_genre:
 *                     type: integer
 *                     example: 1
 *                   thumb:
 *                     type: string
 *                     example: 'https://example.com/thumb.jpg'
 *                   id_user:
 *                     type: integer
 *                     example: 123
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: '2024-11-07T12:00:00Z'
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: '2024-11-07T12:00:00Z'
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.get('/', movieController.getAllMovies);

/**
 * @swagger
 * /movies/order/{order}:
 *   get:
 *     summary: Obtém filmes em ordem
 *     description: Retorna uma lista de filmes ordenada com base no critério.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order
 *         required: true
 *         description: Critério de ordenação (asc ou desc)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de filmes encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: 'The Shawshank Redemption'
 *                   genre:
 *                     type: string
 *                     example: 'Drama'
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.get('/order/:order', movieController.getAllMoviesByOrder);

/**
 * @swagger
 * /movies/filter:
 *   get:
 *     summary: Filtra filmes com base nos critérios fornecidos
 *     description: Retorna uma lista de filmes filtrados conforme os parâmetros fornecidos (por título, gênero, ano de lançamento).
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         description: Título do filme para filtrar
 *         required: false
 *         schema:
 *           type: string
 *         example: 'Inception'
 *       - in: query
 *         name: genre
 *         description: Gênero do filme para filtrar
 *         required: false
 *         schema:
 *           type: string
 *         example: 'Action'
 *       - in: query
 *         name: release_year
 *         description: Ano de lançamento do filme para filtrar
 *         required: false
 *         schema:
 *           type: integer
 *         example: 2010
 *     responses:
 *       200:
 *         description: Lista de filmes filtrados encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: 'Inception'
 *                   description:
 *                     type: string
 *                     example: 'A thief who steals corporate secrets through the use of dream-sharing technology...'
 *                   release_year:
 *                     type: integer
 *                     example: 2010
 *                   duration:
 *                     type: integer
 *                     example: 148
 *                   id_genre:
 *                     type: integer
 *                     example: 3
 *                   thumb:
 *                     type: string
 *                     example: 'https://example.com/inception_thumb.jpg'
 *                   id_user:
 *                     type: integer
 *                     example: 123
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: '2024-11-07T12:00:00Z'
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: '2024-11-07T12:00:00Z'
 *       400:
 *         description: Parâmetros de filtro inválidos.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.get('/filter', movieController.getAllMoviesByFilter);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Cria um novo filme
 *     description: Cria um novo filme no sistema.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Inception'
 *               description:
 *                 type: string
 *                 example: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a CEO.'
 *               release_year:
 *                 type: integer
 *                 example: 2010
 *               duration:
 *                 type: integer
 *                 example: 148
 *               id_genre:
 *                 type: integer
 *                 example: 3
 *               thumb:
 *                 type: string
 *                 example: 'https://example.com/inception_thumb.jpg'
 *     responses:
 *       201:
 *         description: Filme criado com sucesso.
 *       400:
 *         description: Dados inválidos fornecidos.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.post('/', authenticateJWT, movieController.createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Atualiza um filme existente
 *     description: Atualiza um filme com base no ID fornecido.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'The Dark Knight'
 *               description:
 *                 type: string
 *                 example: 'Batman faces the Joker, a criminal mastermind who seeks to plunge Gotham City into anarchy.'
 *               release_year:
 *                 type: integer
 *                 example: 2008
 *               duration:
 *                 type: integer
 *                 example: 152
 *               id_genre:
 *                 type: integer
 *                 example: 2
 *               thumb:
 *                 type: string
 *                 example: 'https://example.com/darkknight_thumb.jpg'
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso.
 *       400:
 *         description: Dados inválidos fornecidos.
 *       401:
 *         description: Falha na autenticação.
 *       404:
 *         description: Filme não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
router.put('/:id', authenticateJWT, movieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Deleta um filme
 *     description: Deleta o filme com o ID fornecido.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme deletado com sucesso.
 *       404:
 *         description: Filme não encontrado.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.delete('/:id', authenticateJWT, movieController.deleteMovie);

export default router;
