import React, { createContext, useContext, useState, ReactNode } from 'react';
import ModalsMf from '../commons/Modals/MoldalsMf';

interface ModalContextProps {
    modalOpen: boolean;
    showModal: (props: ModalMfProps) => void;
    closeModal: () => void;
}
export interface ModalMfProps{
    titleModal: string;
    paragraphModal: string;
    btnClose: boolean;
    secondBtn: boolean;
    textBtn: string;
    textSecondBtn?:string;
    onClick?: (event:any) => void;
    onClickPrimaryBtn?: (event:any) => void;
    onClickSecondBtn?: (event:any)=> void;
}
interface ModalProviderProps {
    children: ReactNode;
  }

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalMfProps | undefined>(undefined);


  const showModal = (props: ModalMfProps) => {
    document.body.style.overflow = 'hidden';
    setModalOpen(true);
    setModalProps(props);
  };
  const closeModal = () => {
    document.body.style.overflow = 'visible';
    setModalOpen(false);
    setModalProps(undefined);
  };

  return (
    <ModalContext.Provider value={{ modalOpen, showModal, closeModal }}>
      {children}
      {modalOpen && modalProps && (
        <>
        <div className="mf-k-modal-overlay"></div>
        <ModalsMf
            titleModal={modalProps.titleModal} 
            paragraphModal={modalProps.paragraphModal} 
            btnClose={modalProps.btnClose}
            onClick={modalProps.onClick}
            textBtn={modalProps.textBtn}
            secondBtn={modalProps.secondBtn}
            textSecondBtn={modalProps.textSecondBtn}
            onClickPrimaryBtn={modalProps.onClickPrimaryBtn}
            onClickSecondBtn={modalProps.onClickSecondBtn} 
        />
        </>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
