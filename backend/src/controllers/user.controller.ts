import { Request, Response } from 'express';
import { CreateUserParams, UpdateUserParams, DeleteUserParams } from '../types/user.type';
import * as userModel from '../models/user.model';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const params: CreateUserParams = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
    };

    try {
        const newUser = await userModel.createUser(params);
        res.status(201).json(newUser);
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const params: UpdateUserParams = {
        id: Number(req.params.id),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
        thumb: req.body.thumb
    };

    try {
        const updatedUser = await userModel.updateUser(params);
        if (!updatedUser) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const params: DeleteUserParams = { id: Number(req.params.id) };

    try {
        const isDeleted = await userModel.deleteUser(params);
        if (!isDeleted) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};
