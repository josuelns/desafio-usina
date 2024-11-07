export enum MovieSortOption {
    HIGHEST_RATED = 'highest_rated',
    LATEST = 'latest',
    ALPHABETICAL = 'alphabetical',
    LAST_REVIEWED = 'last_reviewed'
}

export interface IMovies {
    id: number;
    title: string;
    description: string;
    release_year: number;
    duration: number;
    id_genre: number;
    id_user: number;
    thumb?: string;
    order?: MovieSortOption
}

export interface GetMovieByFilterParams extends Partial<IMovies> {
    min_rating?: number;
    max_rating?: number;
}
export type GetMovieByOrderParams = Pick<IMovies, 'order'>;
export type GetMovieByIdParams = Pick<IMovies, 'id'>;
export type CreateMovieParams = Pick<IMovies, 'title' | 'description' | 'release_year' | 'duration' | 'id_genre' | 'id_user' | 'thumb'>;
export type UpdateMovieParams = Partial<CreateMovieParams> & GetMovieByIdParams;
export type DeleteMovieParams = Pick<IMovies, 'id'>;
