CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,               
    title VARCHAR(100) NOT NULL,          
    description TEXT NOT NULL,           
    release_year INT NOT NULL,           
    duration INT NOT NULL,               
    id_genre INT NOT NULL,                
    thumb VARCHAR(255),                  
    id_user INT,                         
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rollback
-- DROP TABLE IF EXISTS movies;
