import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import { IUsers } from '../types/user.type';
import * as userModel from '../models/user.model';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user: IUsers | null = await userModel.getUserByEmail(email);
        if (!user) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            JWT_SECRET,                        
            { expiresIn: JWT_EXPIRES_IN }      
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar o login' });
    }
};
