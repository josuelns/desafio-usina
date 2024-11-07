// review.routes.js
import { Router } from 'express';
import * as reviewController from '../controllers/review.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Obtém todas as avaliações
 *     description: Retorna uma lista de todas as avaliações.
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     responses:
 *       200:
 *         description: Lista de avaliações encontrada.
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
 *                   movieId:
 *                     type: integer
 *                     example: 1
 *                   rating:
 *                     type: integer
 *                     example: 5
 *                   comment:
 *                     type: string
 *                     example: 'Incrível, um dos melhores filmes que já vi!'
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.get('/', authenticateJWT, reviewController.getAllReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Obtém uma avaliação específica
 *     description: Retorna uma única avaliação com base no ID fornecido.
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da avaliação
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avaliação encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 movieId:
 *                   type: integer
 *                   example: 1
 *                 rating:
 *                   type: integer
 *                   example: 5
 *                 comment:
 *                   type: string
 *                   example: 'Excelente filme!'
 *       404:
 *         description: Avaliação não encontrada.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.get('/:id', authenticateJWT, reviewController.getReviewByMovieId);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Cria uma nova avaliação
 *     description: Cria uma nova avaliação para um filme.
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: integer
 *                 example: 1
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: 'Filme incrível! Super recomendado.'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso.
 *       400:
 *         description: Dados inválidos fornecidos.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.post('/', authenticateJWT, reviewController.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Atualiza uma avaliação existente
 *     description: Atualiza uma avaliação com base no ID fornecido.
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da avaliação a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: 'O filme é bom, mas poderia ser melhor.'
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso.
 *       400:
 *         description: Dados inválidos fornecidos.
 *       401:
 *         description: Falha na autenticação.
 *       404:
 *         description: Avaliação não encontrada.
 *       500:
 *         description: Erro no servidor.
 */
router.put('/:id', authenticateJWT, reviewController.updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Deleta uma avaliação
 *     description: Deleta a avaliação com o ID fornecido.
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []  # Exemplo de autenticação com token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da avaliação a ser deletada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avaliação deletada com sucesso.
 *       404:
 *         description: Avaliação não encontrada.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro no servidor.
 */
router.delete('/:id', authenticateJWT, reviewController.deleteReview);

export default router;
