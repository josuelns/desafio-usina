import React from 'react';
import { IUsers } from '@/types/user.type';
import { useForm } from 'react-hook-form';

interface AuthContextProps {
    user: IUsers | null; 
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null;
    register: any;
    handleSubmit: any;
    errors: any;
    isAuthenticated: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

interface LoginFormData {
    email: string;
    password: string;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>(); // Usando React Hook Form para o login

    const [user, setUser] = React.useState<IUsers | null>(null); 
    const [token, setToken] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const isAuthenticated = Boolean(token); 

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            // API de autenticação
            const response = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            
            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }

            const data = await response.json();
            setToken(data.token);
            // setUser(data.user);

            // Armazenar o token no localStorage
            localStorage.setItem('authToken', data.token);
        } catch (err: any) {
            setError(err.message || 'Erro ao autenticar');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
    };

    React.useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const value = {
        user,
        token,
        login,
        logout,
        loading,
        error,
        register,
        handleSubmit,
        errors,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextProps => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
