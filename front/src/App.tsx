import logo from './assets/images/logo.png';
import fundo from './assets/images/fundo.png';

import './global.css';
import { Filter, Search } from 'lucide-react';

const App = () => {
  return (
    <div
      className='relative'
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '70vh',
      }}
    >
      <div className="absolute inset-0 bg-[#00000080]">
        <header className="relative flex justify-between bg-transparent shadow-md px-6 py-4">
          <div className='mx-4'>
            <img src={logo} alt="RecomendaFlix Logo" className="h-40 min-w-40 w-auto" />
          </div>

          <nav className='flex items-start pt-12 -ml-16'>
            <ul className='flex gap-4 text-white py-2'>
              <li className='hover:text-red-600 cursor-pointer uppercase'>Início</li>
              <li className='relative group'>
                <span className='hover:text-red-600 cursor-pointer uppercase'>Gêneros</span>
                <ul className='absolute left-0 hidden group-hover:flex flex-col gap-2 bg-gray-800 p-2 max-h-40 w-52 overflow-y-auto'>
                  {["Ação", "Aventura", "Animação", "Biografia", "Comédia", "Comédia Romântica", "Documentário", "Drama", "Fantasia", "Ficção Científica", "Mistério", "Musical", "Musical Dramático", "Romance", "Slasher", "Survival", "Terror", "Thriller", "Western", "Cyberpunk", "Noir", "Filme de Guerra", "Filme de Super-Herói", "Mockumentary", "Feel-good"].map(genero => (
                    <li key={genero} className='hover:text-red-600 cursor-pointer uppercase'>{genero}</li>
                  ))}
                </ul>
              </li>
              <li className='hover:text-red-600 cursor-pointer uppercase'>Em Alta</li>
              <li className='hover:text-red-600 cursor-pointer uppercase'>Novidades</li>
            </ul>
          </nav>

          <div className='flex items-start pt-12'>
            <button className="border-2 border-white text-white bg-transparent py-2 px-4 rounded transition duration-300 hover:bg-red-600 hover:border-red-600 shadow-md">
              LOGIN
            </button>
          </div>
        </header>

        <div className='-mt-8'>
          <div className="text-center text-white">
            <h1 className="text-base tracking-wide uppercase text-gray-300 mb-4">RECOMENDAFLIX</h1>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              SEU <span className="text-red-600">GUIA</span> PARA <br className="hidden md:block" /> O MELHOR DO CINEMA
            </h2>
            <div className='flex justify-center items-center mt-6'>

              <div className="flex w-[70%]">
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="px-4 py-2 border rounded-l focus:outline-none w-full"
                />
                <div className='flex mx-2 gap-1'>
                  <button className="bg-red-600 text-white px-4 hover:bg-red-700 transition duration-300 shadow-md rounded-sm">
                    <Search className="inline w-5 h-5" />
                  </button>
                  <button className="bg-gray-800 text-white px-4 ml-2 hover:bg-gray-700 transition duration-300 shadow-md rounded-sm">
                    <Filter className="inline w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
