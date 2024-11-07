import React from "react";

interface DialogProps {
  isOpen: object | null;
  onClose: (cb?: () => void) => void;
}

export const useDialog = (Dialog: React.FC<DialogProps>) => {
  const [isOpen, setIsOpen] = React.useState<object | null>(null);

  // Função para abrir o modal
  const openDialog = React.useCallback((props?: object) => {
    console.log('travo', props)
    setIsOpen(props ?? {});
  }, []);


  // Função para fechar o modal
  const closeDialog = React.useCallback((cb?: () => void) => {
    setIsOpen(null);
    cb?.();
  }, []);


  // Preparando as propriedades para o componente modal
  const dialogProps: DialogProps = {
    isOpen,
    onClose: closeDialog,
  };

  return {
    openDialog,
    closeDialog,
    dialogProps,
    DialogComponent: <Dialog {...dialogProps} />,
  };
};
