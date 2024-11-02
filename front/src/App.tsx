import logo from './assets/images/logo.png';
import fundo from './assets/images/fundo.png';

import './global.css';

const App = () => {
  return (
    <div
      className='relative'
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '65vh',
      }}
    >

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative flex flex-1 justify-between bg-transparent shadow-md px-6">
        <div>
          <img src={logo} alt="Logo" className="h-40 min-w-20 w-auto" />
        </div>

        <div className='flex items-start pt-12'>
          <ul className='flex gap-4 text-white py-2'>
            <li className='hover:text-red-600 cursor-pointer uppercase'>Início</li>
            <li className='relative group'>
              <span className='hover:text-red-600 cursor-pointer uppercase'>Gêneros</span>
              <ul className='absolute left-0 hidden group-hover:flex flex-col gap-2 bg-gray-800 p-2 max-h-40 w-52 overflow-y-auto'>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Ação</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Aventura</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Animação</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Biografia</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Comédia</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Comédia Romântica</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Documentário</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Drama</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Fantasia</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Ficção Científica</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Mistério</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Musical</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Musical Dramático</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Romance</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Slasher</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Survival</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Terror</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Thriller</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Western</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Cyberpunk</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Noir</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Filme de Guerra</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Filme de Super-Herói</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Mockumentary</li>
                <li className='hover:text-red-600 cursor-pointer uppercase'>Feel-good</li>
              </ul>
            </li>
            <li className='hover:text-red-600 cursor-pointer uppercase'>Em Alta</li>
            <li className='hover:text-red-600 cursor-pointer uppercase'>Novidades</li>
          </ul>
        </div>

        <div className='flex items-start pt-12'>
          <button className="border-2 border-white text-white bg-transparent py-2 px-4  rounded transition duration-300 hover:bg-red-600 hover:border-red-600 hover:text-white shadow-md ">
            LOGIN
          </button>
        </div>
      </div>

      <div>

      </div>
    </div>
  );
};

export default App;
