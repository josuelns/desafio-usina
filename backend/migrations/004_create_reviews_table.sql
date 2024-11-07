-- migrations/004_create_reviews_table.sql
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    movie_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE, 
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  
    rating INT NOT NULL, 
    comment VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rollback
-- DROP TABLE IF EXISTS reviews;
