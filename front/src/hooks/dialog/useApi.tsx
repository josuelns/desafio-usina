import React from 'react';
import axios, { Method } from 'axios';

interface UseApiProps {
    url: string; // URL para fazer a requisição
    method?: Method; // Tipo de método HTTP, como 'POST', 'GET', 'PUT'
    body?: any; // Para enviar dados com métodos como 'POST' e 'PUT'
}

export const useApi = <T,>({ url, method = 'GET', body }: UseApiProps) => {
    const [data, setData] = React.useState<T>([] as T); // Estado para armazenar os dados
    const [loading, setLoading] = React.useState<boolean>(true); // Estado para controle de carregamento
    const [error, setError] = React.useState<string | null>(null); // Estado para erros

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Inicia o carregamento
            try {
                const response = await axios({
                    url,
                    method,
                    data: body, // Envia o corpo com a requisição (caso tenha)
                });
                setData(response.data); // Armazena os dados recebidos
            } catch (err: any) {
                setData([] as T)
                setError('Erro ao carregar os dados'); // Armazena a mensagem de erro
                console.error('Erro ao carregar os dados:', err);
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchData();
    }, [url, method, body]); // Recarrega a requisição quando a URL, método ou corpo mudar

    return { data, loading, error };
};
