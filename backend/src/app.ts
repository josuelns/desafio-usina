import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versão da especificação OpenAPI
    info: {
      title: 'API de Filmes',
      version: '1.0.0',
      description: 'Documentação da API para avaliações de filmes',
    },
  },
  // Caminho para os arquivos de rotas que contêm as anotações do Swagger
  apis: ['./src/routes/*.route.ts'], // Caminho do arquivo gerado
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve a documentação do Swagger em '/api-docs'
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

// Função para carregar as rotas dinamicamente
const loadRoutes = (app: express.Application): void => {
  const routesPath = path.join(__dirname, 'routes');

  // Lê todos os arquivos dentro da pasta 'routes'
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.route.ts') || file.endsWith('.route.js')) {
      // Importa a rota dinamicamente
      import(path.join(routesPath, file)).then((routeModule) => {
        const routeName = `/api/${file.split('.')[0]}`;  // Define a URL da rota com base no nome do arquivo
        app.use(routeName, routeModule.default || routeModule);  // Usa a rota carregada
        console.log(`Rota carregada: ${routeName}`);
      }).catch((err) => {
        console.error(`Erro ao carregar a rota: ${file}`, err);
      });
    }
  });
};

loadRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
