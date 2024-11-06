import { Pool } from 'pg';
import { dbConfig } from '../config';

const pool = new Pool({
    ...dbConfig,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const query = (text: string, params?: any[]) => pool.query(text, params);