import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/atoms/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/atoms/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Textarea } from '@/components/atoms/textarea';
import { IMovies } from '@/types/movie.type';

interface MovieDetailsDialogProps {
    isOpen: object | null;
    onClose: () => void;
}

interface CommentFormData {
    rating: number;
    comment: string;
}

export const MovieDetailsDialog = ({ isOpen, onClose }: MovieDetailsDialogProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CommentFormData>();

    const movie = isOpen !== null ? isOpen as IMovies : null;

    // Função para submeter o comentário
    const handleCommentSubmit: SubmitHandler<CommentFormData> = ({ rating, comment }) => {
        if (rating && comment) {
            // setComments([...comments, { user: 'Usuário', rating: String(rating), comment }]);
            reset(); // Resetando o formulário após o envio
        }
    };

    return (
        <Dialog open={isOpen !== null} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg h-auto max-h-[80vh]">
                    <Tabs defaultValue="details" className="mt-4">
                    <DialogHeader>
                    <TabsList className="flex justify-start gap-4 border-b border-gray-300 pb-2">
                        <TabsTrigger 
                            value="details" 
                            className="px-4 py-2 text-sm font-semibold text-gray-700 cursor-pointer transition-all duration-200 hover:text-gray-900 hover:border-b-2 hover:border-red-600 focus:outline-none focus:border-b-2 focus:border-red-600"
                        >
                            Detalhes
                        </TabsTrigger>
                        <TabsTrigger 
                            value="reviews" 
                            className="px-4 py-2 text-sm font-semibold text-gray-700 cursor-pointer transition-all duration-200 hover:text-gray-900 hover:border-b-2 hover:border-red-600 focus:outline-none focus:border-b-2 focus:border-red-600"
                        >
                            Avaliações
                        </TabsTrigger>
                    </TabsList>

                    </DialogHeader>
             
                    <TabsContent value="details" className="mt-4">
                        <div className="movie-details flex gap-8">
                            <div className="w-1/3">
                                <img 
                                    src={'https://image.tmdb.org/t/p/original/spydMyyD81HjGJVwZvjajkrWW1h.jpg'} 
                                    alt={movie?.title} 
                                    className="w-full h-full object-cover rounded-lg shadow-lg" 
                                />
                            </div>
                            <div className="w-2/3">
                                <p><strong>Título:</strong> {movie?.title}</p>
                                <p><strong>Descrição:</strong> {movie?.description}</p>
                                <p><strong>Gênero:</strong> {movie?.id_genre}</p>
                                <p><strong>Ano de Lançamento:</strong> {movie?.release_year}</p>
                                <p><strong>Duração:</strong> {movie?.duration} minutos</p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-4">
                        <h3 className="font-bold mt-6 mb-4 text-xl">Comentários:</h3>
                        <ul className="list-disc pl-5 space-y-2 h-64 overflow-y-auto">
                            {/* Comentários seriam renderizados aqui */}
                            <li>Usuário: 8 - Muito bom!</li>
                            <li>Usuário: 7 - Legal, mas poderia ser melhor.</li>
                            <li>Usuário: 9 - Adorei, super recomendo!</li>
                            <li>Usuário: 10 - Um dos melhores filmes que já vi!</li>
                            <li>Usuário: 6 - Achei meio fraco, mas interessante.</li>
                            {/* Adicionar mais comentários */}
                        </ul>

                        <form onSubmit={handleSubmit(handleCommentSubmit)} className="mb-4 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold">Avaliação:</label>
                                <input
                                    type="number"
                                    {...register('rating', { required: 'A avaliação é obrigatória', min: 0, max: 10 })}
                                    className={`border rounded p-2 w-full ${errors.rating ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Sua avaliação (0-10)"
                                />
                                {errors.rating && <p className="text-red-500 text-xs">{errors.rating.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Comentário:</label>
                                <Textarea
                                    {...register('comment', { required: 'O comentário é obrigatório' })}
                                    placeholder="Deixe seu comentário"
                                    className={`border rounded p-2 w-full ${errors.comment ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.comment && <p className="text-red-500 text-xs">{errors.comment.message}</p>}
                            </div>
                            <Button type="submit" className="bg-red-600 text-white hover:bg-red-700 w-full">
                                Comentar
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
