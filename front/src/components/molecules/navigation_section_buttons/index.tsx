import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  disabledPrevious?: boolean; // Prop para desabilitar o botão de "Anterior"
  disabledNext?: boolean;     // Prop para desabilitar o botão de "Próximo"
}

export const NavigationSectionButtons = ({
  onPrevious,
  onNext,
  disabledPrevious,
  disabledNext,
}: NavigationButtonsProps) => (
  <div className="flex items-center gap-2">
    <button
      className="p-1 bg-red-500 text-white rounded-sm hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onPrevious}
      disabled={disabledPrevious} // Desabilita o botão se necessário
    >
      <ChevronLeft size={24} />
    </button>
    <button
      className="p-1 bg-red-500 text-white rounded-sm hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onNext}
      disabled={disabledNext} // Desabilita o botão se necessário
    >
      <ChevronRight size={24} />
    </button>
  </div>
);
