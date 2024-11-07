import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUsers } from '../types/user.type';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        res.status(403).json({ message: 'Token não fornecido' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user as IUsers; 
        next(); 
    });
};
