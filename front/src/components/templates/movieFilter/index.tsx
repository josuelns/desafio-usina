import { useMovieContext } from '@/context/movie_context';
import { toast } from 'react-toastify'; // Importando toast
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/atoms/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Button } from "@/components/atoms/button";
import { Controller } from 'react-hook-form';

export const MovieFilterDialog = ({ isOpen, onClose }: any) => {
    const { genreOptions, loading, onSubmit, handleSubmit, register, control, errors, filterClear } = useMovieContext();

    if (loading) return <div>Carregando...</div>;

    const handleFormSubmit = async (data: any) => {
        try {
            // Enviar o formulário com sucesso
            await onSubmit(data); // Supondo que onSubmit seja uma função assíncrona
            toast.success('Filtro criado com sucesso!'); // Exibe o toast de sucesso
            onClose(); // Fecha o modal
        } catch (error) {
            toast.error('Erro ao criar filtro. Tente novamente!'); // Exibe o toast de erro
        }
    };

    const handleClearFilter = () => {
        filterClear();
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Criar Filtro</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar um filtro.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(handleFormSubmit)();
                    }}
                    className="space-y-4"
                >
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="genre">Gênero</Label>
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
                        {errors.genre && <span className="text-red-500 text-sm">{errors?.genre?.message?.toString()}</span>}
                    </div>

                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="releaseYear">Ano de Lançamento</Label>
                        <Input
                            id="releaseYear"
                            type="number"
                            {...register('release_year')}
                            placeholder="Ano de lançamento"
                        />
                    </div>

                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="duration">Duração (minutos)</Label>
                        <Input
                            id="duration"
                            type="number"
                            {...register('duration')}
                            placeholder="Duração em minutos"
                        />
                    </div>

                    <div className='flex gap-2'>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="minRating">Avaliação Mínima</Label>
                            <Input
                                id="minRating"
                                type="number"
                                {...register('min_rating', {
                                    min: { value: 0, message: 'A avaliação mínima é 0' },
                                    max: { value: 5, message: 'A avaliação mínima é 5' }
                                })}
                                placeholder="Média mínima"
                                min="0"
                                max="5"
                            />
                            {errors.min_rating && <span className="text-red-500 text-sm">{errors?.min_rating?.message?.toString()}</span>}
                        </div>

                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="maxRating">Avaliação Máxima</Label>
                            <Input
                                id="maxRating"
                                type="number"
                                {...register('max_rating', {
                                    min: { value: 0, message: 'A avaliação máxima é 0' },
                                    max: { value: 5, message: 'A avaliação máxima é 5' }
                                })}
                                placeholder="Média máxima"
                                min="0"
                                max="5"
                            />
                            {errors.max_rating && <span className="text-red-500 text-sm">{errors?.max_rating?.message?.toString()}</span>}
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-between">
                        <Button type="button" className="w-full bg-transparent border border-red-600 text-red-600 hover:bg-red-700 hover:text-white" onClick={handleClearFilter}>
                            limpar Filtro
                        </Button>
                        <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                            Criar Filtro
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
