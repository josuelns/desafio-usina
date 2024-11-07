import { Request, Response } from 'express';
import {
    CreateMovieParams,
    DeleteMovieParams,
    GetMovieByIdParams,
    GetMovieByOrderParams,
    MovieSortOption,
    UpdateMovieParams,
    GetMovieByFilterParams
} from '../types/movie.type';
import * as movieModel from '../models/movie.model';

export const getAllMovies = async (_req: Request, res: Response): Promise<void> => {
    try {
        const movies = await movieModel.getAllMovies();
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
};

export const getAllMoviesByOrder = async (req: Request, res: Response): Promise<void> => {
    const sortOption: MovieSortOption = req.params.order as MovieSortOption;

    const params: GetMovieByOrderParams = { order: sortOption };

    try {
        const movies = await movieModel.getAllMoviesByOrder(params);
        res.json(movies);
    } catch (error) {
        console.error('Error fetching ordered movies:', error);
        res.status(500).json({ error: 'Erro ao buscar filmes ordenados' });
    }
};

export const getAllMoviesByFilter = async (req: Request, res: Response): Promise<void> => {
    const filterParams: GetMovieByFilterParams = {
        id: req.query.id ? Number(req.query.id) : undefined,
        title: req.query.title as string,
        release_year: req.query.release_year ? Number(req.query.release_year) : undefined,
        id_genre: req.query.id_genre ? Number(req.query.id_genre) : undefined,
        min_rating: req.query.min_rating ? Number(req.query.min_rating) : undefined,
        max_rating: req.query.max_rating ? Number(req.query.max_rating) : undefined,
        id_user: req.query.id_user ? Number(req.query.id_user) : undefined,
        order:req.params.order as MovieSortOption
    };

    try {
        const movies = await movieModel.getMovieByFilter(filterParams);
        if (!movies) {
            res.status(404).json({ error: 'Nenhum filme encontrado com os filtros especificados' });
            return;
        }
        res.json(movies);
    } catch (error) {
        console.error('Error fetching filtered movies:', error);
        res.status(500).json({ error: 'Erro ao buscar filmes com filtro' });
    }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    const params: GetMovieByIdParams = { id: Number(req.params.id) };

    try {
        const movie = await movieModel.getMovieById(params);
        if (!movie) {
            res.status(404).json({ error: 'Filme não encontrado' });
            return;
        }
        res.json(movie);
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        res.status(500).json({ error: 'Erro ao buscar filme' });
    }
};

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    const params: CreateMovieParams = {
        title: req.body.title,
        description: req.body.description,
        release_year: req.body.release_year,
        duration: req.body.duration,
        id_genre: req.body.id_genre,
        thumb: req.body.thumb,
        id_user: req.user?.id ?? 0  // Garantindo acesso seguro com optional chaining
    };

    try {
        const newMovie = await movieModel.createMovie(params);
        res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Erro ao criar filme' });
    }
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    const params: UpdateMovieParams = {
        id: Number(req.params.id),
        title: req.body.title,
        description: req.body.description,
        release_year: req.body.release_year,
        duration: req.body.duration,
        id_genre: req.body.id_genre,
        thumb: req.body.thumb
    };

    try {
        const updatedMovie = await movieModel.updateMovie(params);
        if (!updatedMovie) {
            res.status(404).json({ error: 'Filme não encontrado' });
            return;
        }
        res.json(updatedMovie);
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const params: DeleteMovieParams = { id: Number(req.params.id) };

    try {
        const isDeleted = await movieModel.deleteMovie(params);
        if (!isDeleted) {
            res.status(404).json({ error: 'Filme não encontrado' });
            return;
        }
        res.status(200).send();
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Erro ao excluir filme' });
    }
};
