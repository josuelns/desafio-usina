import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'; // Importando useForm do React Hook Form
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
import { Button } from "@/components/atoms/button";
import { useAuthContext } from '@/context/auth_context';

interface LoginFormData {
    email: string;
    password: string;
}

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const LoginForm = ({ onClose }: any) => {
    const { login, handleSubmit, errors, register } = useAuthContext(); // Consumindo o contexto de autenticação

    const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
        await login(data.email, data.password); // Usando a função de login do contexto
        onClose(); // Fechar o modal após o login
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    {...register('email', {
                        required: 'O email é obrigatório',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Email inválido',
                        },
                    })}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="grid flex-1 gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Sua senha"
                    {...register('password', { required: 'A senha é obrigatória' })}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            <DialogFooter className="sm:justify-start">
                <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                    Entrar
                </Button>
            </DialogFooter>
        </form>
    );
}

const RegisterForm = ({ onClose }: any) => {
    const { watch, handleSubmit, register, formState: { errors } } = useForm<RegisterFormData>();
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const handleRegister: SubmitHandler<RegisterFormData> = async (data) => {
        if (data.password !== data.confirmPassword) {
            setErrorMessage('As senhas não coincidem');
            return;
        }

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao registrar o usuário');
            }

            onClose(); // Fechar o modal após o sucesso
        } catch (error) {
            setErrorMessage('Ocorreu um erro ao registrar o usuário. Tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                    type="text"
                    required
                    placeholder="Seu nome"
                    {...register('name', { required: 'O nome é obrigatório' })}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="grid flex-1 gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    {...register('email', {
                        required: 'O email é obrigatório',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Email inválido',
                        },
                    })}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="grid flex-1 gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                    type="password"
                    required
                    placeholder="Sua senha"
                    {...register('password', { required: 'A senha é obrigatória' })}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="grid flex-1 gap-2">
                <Label htmlFor="confirmPassword">Confirme a Senha</Label>
                <Input
                    type="password"
                    required
                    placeholder="Confirme sua senha"
                    {...register('confirmPassword', {
                        required: 'A confirmação da senha é obrigatória',
                        validate: (value) =>
                            value === watch('password') || 'As senhas não coincidem',
                    })}
                />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>

            {errorMessage && <span className="text-red-500">{errorMessage}</span>}

            <DialogFooter className="sm:justify-start">
                <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                    Cadastrar
                </Button>
            </DialogFooter>
        </form>
    );
}

export const LoginDialog = ({ isOpen, onClose }: any) => {
    const [isRegistering, setIsRegistering] = React.useState(false);

    React.useEffect(() => {
        if (!isOpen) {
            setIsRegistering(false);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isRegistering ? 'Cadastro' : 'Login'}</DialogTitle>
                    <DialogDescription>
                        {isRegistering
                            ? 'Crie sua conta preenchendo os dados abaixo.'
                            : 'Por favor, insira seu e-mail e senha para entrar.'}
                    </DialogDescription>
                </DialogHeader>

                {isRegistering ? <RegisterForm onClose={onClose} /> : <LoginForm onClose={onClose} />}

                <div className="mt-4 text-center">
                    {isRegistering ? (
                        <>
                            <span>Já tem uma conta? </span>
                            <Button variant="link" onClick={() => setIsRegistering(false)}>
                                Voltar ao Login
                            </Button>
                        </>
                    ) : (
                        <>
                            <span>Não tem uma conta? </span>
                            <Button variant="link" onClick={() => setIsRegistering(true)}>
                                Cadastre-se
                            </Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
