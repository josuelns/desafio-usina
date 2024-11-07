import { useMovieContext } from "@/context/movie_context";
import { IMovies } from "@/types/movie.type";

import { HeroSection } from "@/components/organisms/hero_section";
import { ListPill } from "@/components/organisms/list_pill";
import { CardSection } from "@/components/organisms/card_section";
import { ScrollToTopButton } from "@/components/organisms/scroll_to_top_button";
import { Footer } from "@/components/molecules/footer";
import { useAuthContext } from "@/context/auth_context";

interface HomeTemplateProps {
    openDetailsModal: (movie: IMovies) => void;
    openLoginModal: (state: object) => void;
    openFilterModal: (state: object) => void;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
    openDetailsModal,
    openLoginModal,
    openFilterModal
}) => {
    const { isAuthenticated, user, logout, } = useAuthContext(); // Consumindo o contexto de autenticação

    const {
        genreOptions,
        alphabetical,
        highest_rated,
        last_reviewed,
        latest,
    } = useMovieContext();

    return (
        <>
            <HeroSection
                openLoginModal={openLoginModal}
                openFilterModal={openFilterModal}
                isAuthenticate={isAuthenticated} openAccountAvaliationModal={function (state: object): void {
                    throw new Error("Function not implemented.");
                }} openAccountMoviesModal={function (state: object): void {
                    throw new Error("Function not implemented.");
                }} openMoviesCreateModal={function (state: object): void {
                    throw new Error("Function not implemented.");
                }} logout={logout} user={user?.name ?? 'User'} />
            <ListPill genres={genreOptions ?? []} />
            <div className="px-4">
                <div className="pb-10 pt-5 px-4">
                    <CardSection
                        title="Em Alta"
                        cards={highest_rated ?? []}
                        itemsPerPage={4}
                        openDetailsModal={openDetailsModal}
                    />
                    <CardSection
                        title="Novidades"
                        cards={latest ?? []}
                        itemsPerPage={4}
                        openDetailsModal={openDetailsModal}
                    />
                    <CardSection
                        title="Catálogo"
                        cards={alphabetical ?? []}
                        itemsPerPage={8}
                        openDetailsModal={openDetailsModal} />
                    <CardSection
                        title="Últimos Comentados"
                        cards={last_reviewed ?? []}
                        itemsPerPage={4}
                        openDetailsModal={openDetailsModal}
                    />
                </div>
            </div>
            <ScrollToTopButton />
            <Footer />
        </>
    );
};

export default HomeTemplate;