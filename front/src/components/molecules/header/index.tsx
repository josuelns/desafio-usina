import { Logo } from "@/components/atoms/logo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/atoms/dropdown-menu";

interface IHeader {
    openLoginModal: (state: object) => void;
    openAccountAvaliationModal: (state: object) => void;
    openAccountMoviesModal: (state: object) => void;
    openMoviesCreateModal: (state: object) => void;
    logout: () => void;
    user: string;
    isAuthenticate: boolean;
}

export const Header = ({
    openLoginModal,
    openAccountAvaliationModal,
    openAccountMoviesModal,
    openMoviesCreateModal,
    logout,
    user,
    isAuthenticate
}: IHeader) => (
    <header className="relative flex justify-between bg-transparent shadow-md px-6 py-4">
        <div className="mx-4">
            <Logo />
        </div>
        <div className="flex items-start pt-12">
            {isAuthenticate ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="border-2 border-white text-white bg-transparent py-2 px-4 rounded transition duration-300 hover:bg-red-600 hover:border-red-600 shadow-md">
                            Conta
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white text-gray-700 rounded-md shadow-lg mt-2 w-48 -ml-4" >
                        <DropdownMenuLabel className="font-bold px-4 py-2">{user}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => openAccountAvaliationModal({})}
                        >
                            Minhas Avaliações
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => openAccountMoviesModal({})}
                        >
                            Meus Filmes
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => openMoviesCreateModal({})}
                        >
                            Adicionar Filme
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className="px-4 py-2 text-red-500 hover:bg-gray-100"
                            onClick={logout}
                        >
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <button
                    className="border-2 border-white text-white bg-transparent py-2 px-4 rounded transition duration-300 hover:bg-red-600 hover:border-red-600 shadow-md"
                    onClick={() => openLoginModal({})}
                >
                    LOGIN
                </button>
            )}
        </div>
    </header>
);
