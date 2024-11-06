// generateSecret.js
const fs = require('fs');
const crypto = require('crypto');
const dotenv = require('dotenv');

// Carregar variáveis do .env (caso já existam)
dotenv.config();

// Função para gerar uma chave secreta aleatória de 64 bytes (segura)
const generateSecret = () => {
  return crypto.randomBytes(124).toString('hex'); // Gera uma chave de 64 bytes
};

// Caminho do arquivo .env
const envFilePath = './.env';

// Gerar nova chave secreta
const newSecret = generateSecret();

// Lê o conteúdo atual do .env
let envContent = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf8') : '';

// Verifica se a chave JWT_SECRET já está no arquivo .env
if (process.env.JWT_SECRET) {
  // Se a chave existir, substitui o valor da chave JWT_SECRET
  const regex = /JWT_SECRET=[^\n]*/;
  if (regex.test(envContent)) {
    // Substitui a linha existente
    envContent = envContent.replace(regex, `JWT_SECRET=${newSecret}`);
    console.log('Chave secreta JWT já existente foi substituída.');
  }
} else {
  // Caso não exista, adiciona a chave secreta ao final do arquivo
  envContent += `\nJWT_SECRET=${newSecret}\n`;
  console.log('Chave secreta JWT não encontrada, adicionando ao arquivo .env.');
}

// Escreve o conteúdo atualizado de volta no arquivo .env
fs.writeFileSync(envFilePath, envContent, 'utf8');
console.log('Chave secreta gerada e salva no arquivo .env');
