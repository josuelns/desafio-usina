import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { useAuthContext } from '@/context/auth_context';

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
import { IGenres } from '@/types/genre.type';

export const MovieCreateDialog = ({ isOpen, onClose }: any) => {
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            genre: '',
            releaseYear: '',
            duration: '',
            title: '',
            description: ''
        }
    });

    const { token } = useAuthContext(); 
    const [genreOptions, setGenreOptions] = React.useState<IGenres[]>([]); 
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/genre');
                setGenreOptions(response.data);
            } catch (error) {
                console.error('Erro ao carregar gêneros:', error);
                toast.error('Erro ao carregar os gêneros.');
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const onSubmit = async (data: any) => {
        const movieData = {
            title: data.title,
            description: data.description,
            release_year: data.releaseYear,
            duration: data.duration,
            id_genre: data.genre,
            thumb: data.thumb || null, 
        };

        try {
            const response = await axios.post(
                'http://localhost:3000/api/movie',
                movieData,
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            console.log('Filme criado com sucesso:', response.data);
            toast.success('Filme criado com sucesso!');
            reset(); 
            onClose(); 
        } catch (error) {
            console.error('Erro ao criar filme:', error);
            toast.error('Erro ao criar o filme.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Criar Filme</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar um filme.
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
                            <Controller
                                name="genre"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange} // Usando onValueChange do ShadCN
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione um gênero" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {genreOptions?.map((g) => (
                                                <SelectItem key={g.id} value={g.id.toString()}>
                                                    {g.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
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

                    <DialogFooter className="sm:justify-start">
                        <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                            Criar Filme
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
