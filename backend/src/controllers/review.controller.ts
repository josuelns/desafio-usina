import { Request, Response } from 'express';
import { CreateReviewParams, DeleteReviewParams, GetReviewByIdParams, UpdateReviewParams } from '../types/review.type';
import * as reviewModel from '../models/review.model';

export const getAllReviews = async (_req: Request, res: Response): Promise<void> => {
    try {
        const reviews = await reviewModel.getAllReviews();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar avaliações' });
    }
};

export const getReviewByMovieId = async (req: Request, res: Response): Promise<void> => {
    const params: GetReviewByIdParams = { id: Number(req.params.id) };

    try {
        const review = await reviewModel.getReviewByMovieId(params);
        if (!review) {
            res.status(404).json({ error: 'Avaliação não encontrada' });
            return;
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar avaliação' });
    }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
    const params: CreateReviewParams = {
        movie_id: req.body.movie_id,
        user_id: req?.user?.id ?? 0,
        rating: req.body.rating,
        comment: req.body.comment,
    };

    try {
        const newReview = await reviewModel.createReview(params);
        res.status(201).json(newReview);
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: 'Erro ao criar avaliação' });
    }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
    const params: UpdateReviewParams = {
        id: Number(req.params.id),
        movie_id: req.body.movie_id,
        user_id: req.body.user_id,
        rating: req.body.rating,
        comment: req.body.comment,
    };

    try {
        const updatedReview = await reviewModel.updateReview(params);
        if (!updatedReview) {
            res.status(404).json({ error: 'Avaliação não encontrada' });
            return;
        }
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar avaliação' });
    }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
    const params: DeleteReviewParams = { id: Number(req.params.id) };

    try {
        const isDeleted = await reviewModel.deleteReview(params);
        if (!isDeleted) {
            res.status(404).json({ error: 'Avaliação não encontrada' });
            return;
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir avaliação' });
    }
};
