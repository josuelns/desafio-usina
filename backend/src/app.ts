import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const loadRoutes = (app: express.Application) => {
  const routesPath = path.join(__dirname, 'routes');
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.route.ts') || file.endsWith('.route.js')) {
      const route = require(path.join(routesPath, file));
      const routeName = `/api/${file.split('.')[0]}`;
      app.use(routeName, route.default || route); 
      console.log(`Rota carregada: ${routeName}`);
    }
  });
};

loadRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
