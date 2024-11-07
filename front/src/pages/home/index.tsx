import HomeTemplate from '@/components/templates/home';

import { useDialog } from '@/hooks/dialog/useDialog';

import { LoginDialog } from '@/components/templates/login';
import { MovieFilterDialog } from '@/components/templates/movieFilter';
import { MovieDetailsDialog } from '@/components/templates/movieDetail';

import { MovieProvider } from '@/context/movie_context';

export const Home = () => {

    const LoginModal = useDialog(LoginDialog);
    const MovieFilterModal = useDialog(MovieFilterDialog);
    const MovieDetailsModal = useDialog(MovieDetailsDialog);

    return (
        <MovieProvider>
            <HomeTemplate
                openDetailsModal={MovieDetailsModal.openDialog}
                openLoginModal={LoginModal.openDialog}
                openFilterModal={MovieFilterModal.openDialog}
            />
            {LoginModal.DialogComponent}
            {MovieFilterModal.DialogComponent}
            {MovieDetailsModal.DialogComponent}
        </MovieProvider>
    );
};

