
export interface IReview {
    id: number;
    movie_id: number;
    user_id: number;
    rating: number;
    comment?: string;
  }
  
  export type CreateReviewParams = Pick<IReview, 'movie_id' | 'user_id' | 'rating' | 'comment'>;
  export type UpdateReviewParams = Partial<CreateReviewParams> & Pick<IReview, 'id'>; // Permite atualização parcial
  export type DeleteReviewParams = Pick<IReview, 'id'>;
  export type GetReviewByIdParams = Pick<IReview, 'id'>;
  