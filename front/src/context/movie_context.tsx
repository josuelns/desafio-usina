import React from 'react';
import { useForm, SubmitHandler, UseFormRegister, FieldValues } from 'react-hook-form';

import { IGenres } from '@/types/genre.type';
import { GetMovieByFilterParams, IMovies, MovieSortOption } from '@/types/movie.type';
import { useApi } from '@/hooks/dialog/useApi';

interface FilterFormData {
    genre?: string;
    release_year?: string;
    min_rating?: string;
    max_rating?: string;
}

interface MovieContextProps {
    genreOptions: IGenres[] | null;
    alphabetical: IMovies[] | null;
    highest_rated: IMovies[] | null;
    last_reviewed: IMovies[] | null;
    latest: IMovies[] | null;
    loading: boolean;
    error: string | null;
    handleSubmit: any;
    register: UseFormRegister<FieldValues>;
    control: any,
    onSubmit: SubmitHandler<FilterFormData>; 
    errors: any; 
}

interface MovieProviderProps {
    children: React.ReactNode;
}

const MovieContext = React.createContext<MovieContextProps | undefined>(undefined);

// Função para gerar o query string
const buildQueryString = (params: GetMovieByFilterParams): string => {
    const query = new URLSearchParams();
    for (const key in params) {
        if (params[key as keyof GetMovieByFilterParams] !== undefined) {
            query.append(key, String(params[key as keyof GetMovieByFilterParams]));
        }
    }
    return query.toString();
};

export const MovieProvider = ({ children }: MovieProviderProps) => {
    const { register,control, handleSubmit, formState: { errors } } = useForm<FilterFormData>(); // Usando React Hook Form

    const [filters, setFilters] = React.useState<GetMovieByFilterParams>({});

    const onSubmit: SubmitHandler<FilterFormData> = (data) => {
        const filterParams: GetMovieByFilterParams = {
            id_genre: data.genre ? Number(data.genre) : undefined,
            release_year: data.release_year ? Number(data.release_year) : undefined,
            min_rating: data.min_rating ? Number(data.min_rating) : undefined,
            max_rating: data.max_rating ? Number(data.max_rating) : undefined,
        };

        console.log('filterParams', filterParams)
        setFilters(filterParams); 
    };

    const filteredMoviesUrl = (params: GetMovieByFilterParams) => {
        return `http://localhost:3000/api/movie/filter?${buildQueryString(params)}`;
    };

    const { data: genreOptions, loading: loadingGenres, error: errorGenres } = useApi<IGenres[]>({
        url: 'http://localhost:3000/api/genre',
    });

    const { data: alphabetical, loading: loadingAlphabetical, error: errorAlphabetical } = useApi<IMovies[]>({
        url: filteredMoviesUrl({ ...filters, order: MovieSortOption.ALPHABETICAL }),
    });

    const { data: highest_rated, loading: loadingHighestRated, error: errorHighestRated } = useApi<IMovies[]>({
        url: filteredMoviesUrl({ ...filters, order: MovieSortOption.HIGHEST_RATED }),
    });

    const { data: last_reviewed, loading: loadingLastReviewed, error: errorLastReviewed } = useApi<IMovies[]>({
        url: filteredMoviesUrl({ ...filters, order: MovieSortOption.LAST_REVIEWED }),
    });

    const { data: latest, loading: loadingLatest, error: errorLatest } = useApi<IMovies[]>({
        url: filteredMoviesUrl({ ...filters, order: MovieSortOption.LATEST }),
    });

    const loading = loadingGenres || loadingAlphabetical || loadingHighestRated || loadingLastReviewed || loadingLatest;
    const error = errorGenres || errorAlphabetical || errorHighestRated || errorLastReviewed || errorLatest;

    const value = {
        genreOptions,
        alphabetical,
        highest_rated,
        last_reviewed,
        latest,
        loading,
        error,
        handleSubmit,
        register,
        control,
        onSubmit,
        errors,
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovieContext = (): MovieContextProps => {
    const context = React.useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};
