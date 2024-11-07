
import { AuthProvider } from './context/auth_context';

import { Home } from './pages/home';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './global.css';


const App = () => {
  return (
    <>
      <AuthProvider>
        <Home />
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
