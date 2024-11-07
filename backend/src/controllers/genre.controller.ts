import { Request, Response } from 'express';
import { CreateGenreParams, DeleteGenreParams, GetGenreByIdParams, UpdateGenreParams } from '../types/genre.type';
import * as genreModel from '../models/genre.model';

export const getAllGenres = async (_req: Request, res: Response): Promise<void> => {
    try {
        const genre = await genreModel.getAllGenres();
        res.json(genre);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar gêneros' });
    }
};

export const getGenreById = async (req: Request, res: Response): Promise<void> => {
    const params: GetGenreByIdParams = { id: Number(req.params.id) };

    try {
        const genre = await genreModel.getGenreById(params);
        if (!genre) {
            res.status(404).json({ error: 'Gênero não encontrado' });
            return;
        }
        res.json(genre);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar gênero' });
    }
};

export const createGenre = async (req: Request, res: Response): Promise<void> => {
    const params: CreateGenreParams = {
        name: req.body.name,
    };

    try {
        const newGenre = await genreModel.createGenre(params);
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar gênero' });
    }
};

export const updateGenre = async (req: Request, res: Response): Promise<void> => {
    const params: UpdateGenreParams = {
        id: Number(req.params.id),
        name: req.body.name,
    };

    try {
        const updatedGender = await genreModel.updateGenre(params);
        if (!updatedGender) {
            res.status(404).json({ error: 'Filme não encontrado' });
            return;
        }
        res.json(updatedGender);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
};

export const deleteGenre = async (req: Request, res: Response): Promise<void> => {
    const params: DeleteGenreParams = { id: Number(req.params.id) };

    try {
        const isDeleted = await genreModel.deleteGenre(params);
        if (!isDeleted) {
            res.status(404).json({ error: 'Filme não encontrado' });
            return;
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir filme' });
    }
};
