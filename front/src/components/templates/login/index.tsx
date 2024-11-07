import React from 'react';
import { SubmitHandler } from 'react-hook-form'; // Importando useForm do React Hook Form
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

export const LoginDialog = ({ isOpen, onClose }: any) => {
    const [isRegistering, setIsRegistering] = React.useState(false); // Controle para alternar entre login e registro
    const { login, register, handleSubmit, errors } = useAuthContext(); // Consumindo o contexto de autenticação

    const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
        await login(data.email, data.password); // Usando a função de login do contexto
        onClose(); // Fechar o modal após o login
    };

    const handleRegister: SubmitHandler<RegisterFormData> = (data) => {
        if (data.password !== data.confirmPassword) {
            alert('As senhas não coincidem');
            return;
        }
        // Lógica para cadastro (se necessário)
        console.log('Cadastro com', data.name, data.email, data.password);
        onClose(); // Fechar o modal após o cadastro
    };

    React.useEffect(() => {
        if (!isOpen) {
            setIsRegistering(false); // Resetar para login ao fechar o modal
            // setFormData({
            //     email: '',
            //     password: '',
            //     confirmPassword: '',
            //     name: '',
            // });
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

                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="space-y-4"
                >
                    {/* Formulário de Login */}
                    {!isRegistering && (
                        <>
                            <div className="grid flex-1 gap-2" tabIndex={1}>
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
                        </>
                    )}

                    {/* Formulário de Cadastro */}
                    {/* {isRegistering && (
                        <>
                            <div className="grid flex-1 gap-2" tabIndex={1}>
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    name="name"
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
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="seu.email@exemplo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    {...registerRegister('email', {
                                        required: 'O email é obrigatório',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Email inválido',
                                        },
                                    })}
                                />
                                {registerErrors.email && <span className="text-red-500">{registerErrors.email.message}</span>}
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Sua senha"
                                    value={formData.password}
                                    onChange={handleChange}
                                    {...registerRegister('password', { required: 'A senha é obrigatória' })}
                                />
                                {registerErrors.password && <span className="text-red-500">{registerErrors.password.message}</span>}
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="confirm-password">Confirme a Senha</Label>
                                <Input
                                    id="confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    placeholder="Confirme sua senha"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    {...registerRegister('confirmPassword', {
                                        required: 'A confirmação da senha é obrigatória',
                                        validate: (value) =>
                                            value === formData.password || 'As senhas não coincidem',
                                    })}
                                />
                                {registerErrors.confirmPassword && <span className="text-red-500">{registerErrors.confirmPassword.message}</span>}
                            </div>
                        </>
                    )} */}

                    <DialogFooter className="sm:justify-start">
                        <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                            {isRegistering ? 'Cadastrar' : 'Entrar'}
                        </Button>
                    </DialogFooter>
                </form>

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
