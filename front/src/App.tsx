import logo from './assets/images/logo.png';
import fundo from './assets/images/fundo.png';
import './global.css';
import { ArrowUp, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from './components/ui/textarea';
import { TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';

const LoginDialog = ({ isOpen, onClose }: any) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (event: any) => {
    event.preventDefault();
    // Lógica de login aqui
    onClose();
  };

  const handleRegister = (event: any) => {
    event.preventDefault();
    // Lógica de cadastro aqui
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setIsRegistering(false)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isRegistering ? 'Cadastro' : 'Login'}</DialogTitle>
          <DialogDescription>
            {isRegistering ? 'Crie sua conta preenchendo os dados abaixo.' : 'Por favor, insira seu e-mail e senha para entrar.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">

          {!isRegistering && (
            <>
              <div className="grid flex-1 gap-2" tabIndex={1}>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" required placeholder="seu.email@exemplo.com" />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required placeholder="Sua senha" />
              </div>
            </>
          )}
          {isRegistering && (
            <>
              <div className="grid flex-1 gap-2" tabIndex={1}>
                <Label htmlFor="email">Nome</Label>
                <Input id="email" type="email" required placeholder="seu.email@exemplo.com" />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" required placeholder="seu.email@exemplo.com" />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required placeholder="Sua senha" />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="confirm-password">Confirme a Senha</Label>
                <Input id="confirm-password" type="password" required placeholder="Confirme sua senha" />
              </div>
            </>
          )}
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

const FilterDialog = ({ isOpen, onClose }: any) => {
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [duration, setDuration] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');

  const handleFilterCreate = (event: any) => {
    event.preventDefault();
    // Lógica para criar o filtro aqui
    console.log({
      genre,
      releaseYear,
      duration,
      minRating,
      maxRating,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Filtro</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar um filtro.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFilterCreate} className="space-y-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="genre">Gênero</Label>
            <Select onValueChange={setGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um gênero" />
              </SelectTrigger>
              <SelectContent>
                {['Ação', 'Aventura', 'Comédia', 'Drama', 'Terror'].map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid flex-1 gap-2">
            <Label htmlFor="releaseYear">Ano de Lançamento</Label>
            <Input
              id="releaseYear"
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              required
              placeholder="Ano de lançamento"
            />
          </div>

          <div className="grid flex-1 gap-2">
            <Label htmlFor="duration">Duração (minutos)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              placeholder="Duração em minutos"
            />
          </div>

          <div className='flex gap-2'>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="minRating">Avaliação Mínima</Label>
              <Input
                id="minRating"
                type="number"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                placeholder="Média mínima"
                min="0"
                max="10"
              />
            </div>

            <div className="grid flex-1 gap-2">
              <Label htmlFor="maxRating">Avaliação Máxima</Label>
              <Input
                id="maxRating"
                type="number"
                value={maxRating}
                onChange={(e) => setMaxRating(e.target.value)}
                placeholder="Média máxima"
                min="0"
                max="10"
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
              Criar Filtro
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const DetailsModal = ({ isOpen, onClose, movie }: any) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(movie.comments || []);

  const handleCommentSubmit = (event: any) => {
    event.preventDefault();
    if (comment) {
      setComments([...comments, { user: 'Usuário', rating, comment }]); // Adiciona o usuário, nota e comentário
      setComment('');
      setRating('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Informações</DialogTitle>
          <Tabs defaultValue="details" className="mt-4">
            <TabsList>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="movie-details flex">
                <div>
                  <img src={'https://image.tmdb.org/t/p/original/spydMyyD81HjGJVwZvjajkrWW1h.jpg'} alt={movie.title} className="w-full h-full " />
                </div>
                <div>
                  <p><strong>Titulo:</strong> {movie.title}</p>
                  <p><strong>Descrição:</strong> {movie.description}</p>
                  <p><strong>Gênero:</strong> {movie.genre}</p>
                  <p><strong>Ano de Lançamento:</strong> {movie.releaseYear}</p>
                  <p><strong>Duração:</strong> {movie.duration} minutos</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <label className="block mb-2">Avaliação:</label>
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Sua avaliação (0-10)"
                  min="0"
                  max="10"
                  className="border rounded p-2 w-full mb-2"
                />
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Deixe seu comentário"
                  className="border rounded p-2 w-full mb-2"
                />
                <Button type="submit" className="bg-red-600 text-white hover:bg-red-700">
                  Comentar
                </Button>
              </form>

              <h3 className="font-bold mt-4">Comentários:</h3>
              <ul className="list-disc pl-5">
                {comments.length > 0 ? (
                  comments.map((c: any, index: any) => (
                    <li key={index} className="mt-2">{`${c.user}: ${c.rating} - ${c.comment}`}</li>
                  ))
                ) : (
                  <li className="mt-2">Nenhum comentário ainda.</li>
                )}
              </ul>
            </TabsContent>
          </Tabs>

        </DialogHeader>


      </DialogContent>
    </Dialog>
  );
};

const CardSection = ({ title, cards, openDetailsModal }: any) => (
  <div className="mb-10">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-gray-800 uppercase">{title}</h2>
      <div className="flex items-center gap-2">
        <button className="p-1 bg-red-500 text-white rounded-sm hover:bg-red-600 transition">
          <ChevronLeft size={24} />
        </button>
        <button className="p-1 bg-red-500 text-white rounded-sm hover:bg-red-600 transition">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
    <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-screen-lg mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {cards.map((card: any, index: number) => (
        <div
          key={index}
          className="relative w-[225px] h-[320px] bg-black text-white rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: "url('https://image.tmdb.org/t/p/original/spydMyyD81HjGJVwZvjajkrWW1h.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#000000be] bg-opacity-70 p-6 flex flex-col justify-end">
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="mb-4 text-sm">{card.description.slice(0, 100)}</p>
            <button className="text-white hover:text-gray-300 font-bold flex items-center gap-1" onClick={() => openDetailsModal(card)}>
              {card.buttonText} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
);

const App = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cards = [
    { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" },
    { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" }, { title: "Giveaway", description: "Gear up for victory! Join FastFuel Esports giveaway and enter to win a premium gaming keyboard.", buttonText: "Mais Detalhes" },
    { title: "Academy Team", description: "Our Academy Team receives invaluable mentorship from experienced seniors, guiding them to success in their careers.", buttonText: "Mais Detalhes" },
  ];

  const openDetailsModal = (movie: any) => {
    setSelectedMovie(movie);
    setIsDetailsOpen(true);
  };


  return (
    <div>
      {/* Render Dialogs */}
      <LoginDialog isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <FilterDialog isOpen={isFilterOpen} onClose={() => setFilterOpen(false)} />
      {
        selectedMovie && (

          <DetailsModal
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            movie={selectedMovie}
          />
        )
      }

      <motion.div
        className='relative'
        style={{
          backgroundImage: `url(${fundo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '52vh',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[#00000080]">
          <header className="relative flex justify-between bg-transparent shadow-md px-6 py-4">
            <div className='mx-4'>
              <img src={logo} alt="RecomendaFlix Logo" className="h-44 min-w-44 w-auto" />
            </div>
            <div className='flex items-start pt-12'>
              <button className="border-2 border-white text-white bg-transparent py-2 px-4 rounded transition duration-300 hover:bg-red-600 hover:border-red-600 shadow-md" onClick={() => setLoginOpen(true)}>
                LOGIN
              </button>
            </div>
          </header>

          <div className='-mt-[14%]'>
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
                    className="px-4 py-2 border rounded-l focus:outline-none w-full text-black"
                  />
                  <div className='flex mx-2 gap-1'>
                    <button className="bg-red-600 text-white px-4 hover:bg-red-700 transition duration-300 shadow-md rounded-sm">
                      <Search className="inline w-5 h-5" />
                    </button>
                    <button className="bg-gray-800 text-white px-4 ml-2 hover:bg-gray-700 transition duration-300 shadow-md rounded-sm" onClick={() => setFilterOpen(true)}>
                      <Filter className="inline w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <ul className="flex gap-4 overflow-hidden hover:overflow-x-auto px-4 scrollbar-hide">
          {["Ação", "Aventura", "Animação", "Biografia", "Comédia", "Comédia Romântica"].map(genero => (
            <li key={genero} className="text-white cursor-pointer uppercase whitespace-nowrap py-1 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 shadow-md">
              {genero}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="px-4">
        <div className="pb-10 pt-5 px-4">
          <CardSection title="Em Alta" cards={cards.slice(0, 4)} openDetailsModal={openDetailsModal} />
          <CardSection title="Novidades" cards={cards.slice(0, 4)} openDetailsModal={openDetailsModal} />
          <CardSection title="Catálogo" cards={cards.slice(0, 8)} openDetailsModal={openDetailsModal} />
          <CardSection title="Últimos Comentados" cards={cards.slice(0, 4)} openDetailsModal={openDetailsModal} />
        </div>
      </div>




      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      <div className='border-t-[1px] text-center mt-12 py-8 border-gray-700'>
        Desenvolvido por Josue Leandro Navarro Ribeiro
      </div>
    </div>
  );
};

export default App;
