import { Router } from 'express';
import * as authController from '../controllers/auth.contoller';

const router = Router();
/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Realiza a autenticação do usuário, retornando um token se o login for bem-sucedido.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'user123'
 *               password:
 *                 type: string
 *                 example: 'senha123'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna o token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXV0aF9vcmlnaW5hbCJ9.rjw_XR3y2df...'
 *       400:
 *         description: Dados de login inválidos.
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/', authController.login);

export default router;
