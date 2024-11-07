// genre.routes.js
import { Router } from 'express';
import * as genreController from '../controllers/genre.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Obtém todos os gêneros
 *     description: Retorna uma lista de todos os gêneros.
 *     tags:
 *       - Genres
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     responses:
 *       200:
 *         description: Lista de gêneros encontrada.
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
 *                   name:
 *                     type: string
 *                     example: 'Fiction'
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.get('/', genreController.getAllGenres);

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Obtém um gênero específico
 *     description: Retorna um único gênero com base no ID fornecido.
 *     tags:
 *       - Genres
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do gênero
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gênero encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: 'Drama'
 *       404:
 *         description: Gênero não encontrado.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.get('/:id', genreController.getGenreById);

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Cria um novo gênero
 *     description: Cria um novo gênero no sistema.
 *     tags:
 *       - Genres
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Action'
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso.
 *       400:
 *         description: Dados inválidos fornecidos.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.post('/',authenticateJWT, genreController.createGenre);

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Atualiza um gênero existente
 *     description: Atualiza um gênero com base no ID fornecido.
 *     tags:
 *       - Genres
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do gênero a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Thriller'
 *     responses:
 *       200:
 *         description: Gênero atualizado com sucesso.
 *       400:
 *         description: Dados inválidos fornecidos.
 *       401:
 *         description: Falha na autenticação.
 *       404:
 *         description: Gênero não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
router.put('/:id', authenticateJWT, genreController.updateGenre);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Deleta um gênero
 *     description: Deleta o gênero com o ID fornecido.
 *     tags:
 *       - Genres
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do gênero a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gênero deletado com sucesso.
 *       404:
 *         description: Gênero não encontrado.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.delete('/:id', authenticateJWT, genreController.deleteGenre);

export default router;
