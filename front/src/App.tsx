
import { AuthProvider } from './context/auth_context';

import { Home } from './pages/home';

import './global.css';

const App = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

export default App;
