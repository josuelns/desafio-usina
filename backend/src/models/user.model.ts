import { IUsers, CreateUserParams, DeleteUserParams, UpdateUserParams } from '../types/user.type';
import { query } from './db';
import bcrypt from 'bcryptjs';

export const createUser = async ({
    name,
    email,
    password,
}: CreateUserParams): Promise<IUsers> => {
    const existingUser = await query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    if (existingUser?.rowCount && existingUser.rowCount > 0) {
        throw new Error('Email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
        `INSERT INTO users (name, email, password, created_at, updated_at) 
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
         RETURNING *`,
        [name, email, hashedPassword]
    );

    return result.rows[0];
};

export const updateUser = async ({
    id,
    name,
    email,
    password,
    thumb
}: UpdateUserParams): Promise<IUsers | null> => {
    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }

    if (email) {
        fields.push(`email = $${index++}`);
        values.push(email);
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        fields.push(`password = $${index++}`);
        values.push(hashedPassword);
    }

    if (thumb) {
        fields.push(`thumb = $${index++}`);
        values.push(thumb);
    }

    // Ensure the updated_at timestamp is set to the current time
    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    if (fields.length === 0) return null;

    values.push(id);

    const queryText = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    const result = await query(queryText, values);

    return result.rows[0] || null;
};

export const deleteUser = async ({ id }: DeleteUserParams): Promise<boolean> => {
    const result = await query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

    return result?.rowCount !== null && result.rowCount > 0;
};

export const getUserByEmail = async (email: string): Promise<IUsers | null> => {
    const result = await query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
};
