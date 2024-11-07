// src/components/HeroSection.tsx

import { motion } from 'framer-motion';
import fundo from '@/assets/images/fundo.png';
import { IntroHeader } from '@/components/molecules/intro_header';
import { SearchForm } from '@/components/molecules/search_form';
import { Header } from '@/components/molecules/header';

interface IHeroSection {
    openLoginModal: (state: object) => void;
    openFilterModal: (state: object) => void;
    openAccountAvaliationModal: (state: object) => void;
    openAccountMoviesModal: (state: object) => void;
    openMoviesCreateModal: (state: object) => void;
    logout: () => void;
    user: string;
    isAuthenticate: boolean;
}

export const HeroSection = ({
    openLoginModal,
    openFilterModal,
    openAccountAvaliationModal,
    openAccountMoviesModal,
    openMoviesCreateModal,
    logout,
    user,
    isAuthenticate
}: IHeroSection) => (
    <motion.div
        className="relative"
        style={{
            backgroundImage: `url(${fundo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "52vh",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className="absolute inset-0 bg-[#00000080]">
            <Header
                openLoginModal={openLoginModal}
                openAccountAvaliationModal={openAccountAvaliationModal}
                openAccountMoviesModal={openAccountMoviesModal}
                openMoviesCreateModal={openMoviesCreateModal}
                isAuthenticate={isAuthenticate}
                user={user}
                logout={logout}
            />
            <div className="-mt-[14%]">
                <div className="text-center text-white">
                    <IntroHeader />
                    <div className="flex justify-center items-center mt-6">
                        <SearchForm openFilterModal={openFilterModal} />
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);
