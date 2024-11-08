import { MovieProvider } from '@/context/movie_context';
import { useDialog } from '@/hooks/dialog/useDialog';

import HomeTemplate from '@/components/templates/home';
import { LoginDialog } from '@/components/templates/login';
import { MovieFilterDialog } from '@/components/templates/movieFilter';
import { MovieDetailsDialog } from '@/components/templates/movieDetail';
import { MovieCreateDialog } from '@/components/templates/movieCreate';


export const Home = () => {

    const LoginModal = useDialog(LoginDialog);
    const MovieFilterModal = useDialog(MovieFilterDialog);
    const MovieDetailsModal = useDialog(MovieDetailsDialog);
    const MovieCreateModal = useDialog(MovieCreateDialog);

    return (
        <MovieProvider>
            <HomeTemplate
                openDetailsModal={MovieDetailsModal.openDialog}
                openLoginModal={LoginModal.openDialog}
                openFilterModal={MovieFilterModal.openDialog} 
                openAccountAvaliationModal={() => { }} 
                openAccountMoviesModal={() => { }}
                openMoviesCreateModal={MovieCreateModal.openDialog}
            />
            {LoginModal.DialogComponent}
            {MovieFilterModal.DialogComponent}
            {MovieDetailsModal.DialogComponent}
            {MovieCreateModal.DialogComponent}
        </MovieProvider>
    );
};

