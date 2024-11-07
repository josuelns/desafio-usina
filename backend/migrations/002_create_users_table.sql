-- migrations/003_create_users_table.sql

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Usado para armazenar senhas hash
    thumb VARCHAR(255),  -- Pode ser um caminho para a imagem ou URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rollback
-- DROP TABLE IF EXISTS users;