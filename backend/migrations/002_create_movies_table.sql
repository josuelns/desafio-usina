-- Criação da tabela de filmes
CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,               -- ID único para cada filme
    title VARCHAR(100) NOT NULL,          -- Título do filme
    description TEXT NOT NULL,            -- Descrição do filme
    release_year INT NOT NULL,            -- Ano de lançamento
    duration INT NOT NULL,                -- Duração do filme em minutos
    id_genre INT NOT NULL,                -- ID do gênero, referenciando a tabela 'genero'
    thumb VARCHAR(255),                   -- Caminho ou nome do arquivo da miniatura (não é FK)
    CONSTRAINT fk_genre FOREIGN KEY (id_genre) REFERENCES genres(id) ON DELETE CASCADE  -- Relacionamento com a tabela 'genero'
);

-- Rollback
-- DROP TABLE IF EXISTS movies;