
/**
 * @swagger
 * /api/movie:
 *   get:
 *     description: Descrição automática da rota GET /
 *     parameters:
 *        
 *        
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: {}
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 *       400:
 *         description: Erro de requisição
 *       500:
 *         description: Erro do servidor
 */


/**
 * @swagger
 * /api/movie:
 *   get:
 *     description: Descrição automática da rota GET /:id
 *     parameters:
 *       [{"name":"id","in":"path","required":true,"type":"string"}]
 *        
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: {}
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 *       400:
 *         description: Erro de requisição
 *       500:
 *         description: Erro do servidor
 */


/**
 * @swagger
 * /api/movie:
 *   post:
 *     description: Descrição automática da rota POST /
 *     parameters:
 *        
 *        
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: {"type":"object","properties":{"title":{"type":"string"},"description":{"type":"string"}}}
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 *       400:
 *         description: Erro de requisição
 *       500:
 *         description: Erro do servidor
 */


/**
 * @swagger
 * /api/movie:
 *   put:
 *     description: Descrição automática da rota PUT /:id
 *     parameters:
 *       [{"name":"id","in":"path","required":true,"type":"string"}]
 *        
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: {"type":"object","properties":{"title":{"type":"string"},"description":{"type":"string"}}}
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 *       400:
 *         description: Erro de requisição
 *       500:
 *         description: Erro do servidor
 */


/**
 * @swagger
 * /api/movie:
 *   delete:
 *     description: Descrição automática da rota DELETE /:id
 *     parameters:
 *       [{"name":"id","in":"path","required":true,"type":"string"}]
 *        
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: {}
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 *       400:
 *         description: Erro de requisição
 *       500:
 *         description: Erro do servidor
 */
