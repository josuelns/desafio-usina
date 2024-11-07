import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Button } from "@/components/atoms/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/atoms/dialog";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";

import './global.css';

export const MovieCreateDialog = ({ isOpen, onClose }: any) => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            genre: '',
            releaseYear: '',
            duration: '',
            minRating: '',
            maxRating: '',
            title: '',
            description: '',
            thumb: ''
        }
    });

    const [genreOptions, setGenreOptions] = React.useState<any[]>([]); // Estado para armazenar os gêneros
    const [loading, setLoading] = React.useState<boolean>(true); // Estado para controle de carregamento

    React.useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/genre');
                setGenreOptions(response.data); // Supondo que a resposta seja uma lista de gêneros
            } catch (error) {
                console.error('Erro ao carregar gêneros:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    // Lógica de submissão
    const onSubmit = async (data: any) => {
        // Preparando os dados para envio
        const movieData = {
            title: data.title,
            description: data.description,
            release_year: data.releaseYear,
            duration: data.duration,
            id_genre: data.genre, // Gênero selecionado
            thumb: data.thumb,  // Thumbnail (caso tenha)
        };

        try {
            // Enviando os dados para a API com axios
            const response = await axios.post('http://localhost:3000/api/movie', movieData);
            console.log('Filme criado com sucesso:', response.data);
            reset(); // Limpa os campos do formulário após o envio
            onClose(); // Fecha o modal
        } catch (error) {
            console.error('Erro ao criar filme:', error);
        }
    };

    // Obter o valor de minRating e maxRating para validar que minRating <= maxRating
    const minRating = watch('minRating');
    const maxRating = watch('maxRating');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Criar Filtro</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar um filtro.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            {...register('title', { required: 'Título é obrigatório' })}
                            placeholder="Título do filme"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            id="description"
                            {...register('description', { required: 'Descrição é obrigatória' })}
                            placeholder="Descrição do filme"
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="genre">Gênero</Label>
                        {loading ? (
                            <div>Carregando gêneros...</div>
                        ) : (
                            <Select {...register('genre', { required: 'Gênero é obrigatório' })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um gênero" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genreOptions.map((genre) => (
                                        <SelectItem key={genre.id} value={genre.id}>
                                            {genre.name} {/* Supondo que o objeto de gênero tenha as propriedades `id` e `name` */}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        {errors.genre && <span className="text-red-500 text-sm">{errors.genre.message}</span>}
                    </div>

                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="releaseYear">Ano de Lançamento</Label>
                        <Input
                            id="releaseYear"
                            type="number"
                            {...register('releaseYear', { required: 'Ano de lançamento é obrigatório' })}
                            placeholder="Ano de lançamento"
                        />
                        {errors.releaseYear && <span className="text-red-500 text-sm">{errors.releaseYear.message}</span>}
                    </div>

                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="duration">Duração (minutos)</Label>
                        <Input
                            id="duration"
                            type="number"
                            {...register('duration', { required: 'Duração é obrigatória' })}
                            placeholder="Duração em minutos"
                        />
                        {errors.duration && <span className="text-red-500 text-sm">{errors.duration.message}</span>}
                    </div>

                    <div className='flex gap-2'>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="minRating">Avaliação Mínima</Label>
                            <Input
                                id="minRating"
                                type="number"
                                {...register('minRating', {
                                    required: 'Avaliação mínima é obrigatória',
                                    min: {
                                        value: 0,
                                        message: 'Avaliação mínima deve ser entre 0 e 5',
                                    },
                                    max: {
                                        value: 5,
                                        message: 'Avaliação mínima deve ser entre 0 e 5',
                                    },
                                })}
                                placeholder="Média mínima"
                            />
                            {errors.minRating && <span className="text-red-500 text-sm">{errors.minRating.message}</span>}
                        </div>

                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="maxRating">Avaliação Máxima</Label>
                            <Input
                                id="maxRating"
                                type="number"
                                {...register('maxRating', {
                                    required: 'Avaliação máxima é obrigatória',
                                    min: {
                                        value: 0,
                                        message: 'Avaliação máxima deve ser entre 0 e 5',
                                    },
                                    max: {
                                        value: 5,
                                        message: 'Avaliação máxima deve ser entre 0 e 5',
                                    },
                                    validate: {
                                        // Validar se minRating <= maxRating
                                        maxRatingValidation: (value) => {
                                            if (minRating && value < minRating) {
                                                return 'Avaliação máxima não pode ser menor que a avaliação mínima';
                                            }
                                            return true;
                                        }
                                    }
                                })}
                                placeholder="Média máxima"
                            />
                            {errors.maxRating && <span className="text-red-500 text-sm">{errors.maxRating.message}</span>}
                        </div>
                    </div>

                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="thumb">Thumbnail (URL)</Label>
                        <Input
                            id="thumb"
                            {...register('thumb')}
                            placeholder="URL da thumbnail (opcional)"
                        />
                    </div>

                    <DialogFooter className="sm:justify-start">
                        <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                            Criar Filtro
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
