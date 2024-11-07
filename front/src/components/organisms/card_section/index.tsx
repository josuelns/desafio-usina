import { motion } from "framer-motion";
import { Card } from "@/components/molecules/card";
import { NavigationSectionButtons } from "@/components/molecules/navigation_section_buttons";
import { IMovies } from "@/types/movie.type";
import { useState } from "react";

interface CardSectionProps {
  title: string;
  cards: IMovies[]; // Lista completa de filmes
  openDetailsModal: (card: IMovies) => void;
  itemsPerPage: number; // Número de filmes por página (passado como prop)
}

export const CardSection = ({
  title,
  cards,
  openDetailsModal,
  itemsPerPage = 4,
}: CardSectionProps) => {
  // Estado da página atual, iniciado em 1 (primeira página)
  const [currentPage, setCurrentPage] = useState(1);

  // Funções de navegação
  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNext = () => {
    if (currentPage * itemsPerPage < cards.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calcula o índice de início e fim dos filmes a serem exibidos na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra os filmes para exibir apenas os da página atual
  const currentCards = cards.slice(startIndex, endIndex);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 uppercase">{title}</h2>
        <NavigationSectionButtons
          onPrevious={onPrevious}  // Passa as funções de navegação para o botão
          onNext={onNext}
          disabledPrevious={currentPage === 1}  // Desabilita o botão "Anterior" na primeira página
          disabledNext={endIndex >= cards.length}  // Desabilita o botão "Próximo" quando chegar no fim
        />
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-screen-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            buttonText={"Ver Detalhes"}
            imageUrl="https://image.tmdb.org/t/p/original/spydMyyD81HjGJVwZvjajkrWW1h.jpg"
            onClick={() => openDetailsModal(card)}
          />
        ))}
      </motion.div>
    </div>
  );
};
