import { CreateReviewParams, DeleteReviewParams, GetReviewByIdParams, UpdateReviewParams } from '../types/review.type';
import { query } from './db';

export const getAllReviews = async () => {
    const result = await query('SELECT * FROM reviews');
    return result.rows;
};

export const getReviewByMovieId = async ({ id }: GetReviewByIdParams) => {
    const result = await query('SELECT * FROM reviews WHERE movie_id = $1', [id]);
    return result.rows[0];
};

export const createReview = async ({
    movie_id,
    user_id,
    rating,
    comment
}: CreateReviewParams) => {
    const result = await query(
        `INSERT INTO reviews (movie_id, user_id, rating, comment, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
         RETURNING *`,
        [movie_id, user_id, rating, comment]
    );
    return result.rows[0];
};

// Update an existing review
export const updateReview = async ({
    id,
    movie_id,
    user_id,
    rating,
    comment
}: UpdateReviewParams) => {
    const fields = [];
    const values = [];
    let index = 1;

    if (movie_id) {
        fields.push(`movie_id = $${index++}`);
        values.push(movie_id);
    }
    if (user_id) {
        fields.push(`user_id = $${index++}`);
        values.push(user_id);
    }
    if (rating) {
        fields.push(`rating = $${index++}`);
        values.push(rating);
    }
    if (comment) {
        fields.push(`comment = $${index++}`);
        values.push(comment);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    if (fields.length === 0) return null;

    values.push(id);

    const queryText = `UPDATE reviews SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    const result = await query(queryText, values);
    return result.rows[0] || null;
};

export const deleteReview = async ({ id }: DeleteReviewParams) => {
    const result = await query('DELETE FROM reviews WHERE id = $1 RETURNING id', [id]);
    return Boolean(result?.rowCount && result.rowCount > 0);
};
