export interface IGenres {
    id: number;
    name: string;
}

export type GetGenreByIdParams = Pick<IGenres, 'id'>;
export type CreateGenreParams = Pick<IGenres, 'name'>;
export type UpdateGenreParams = Pick<IGenres, 'id' | 'name'>;
export type DeleteGenreParams = Pick<IGenres, 'id'>;