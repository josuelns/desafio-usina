-- migrations/001_create_genres_table.sql
CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Rollback
-- DROP TABLE IF EXISTS genres;