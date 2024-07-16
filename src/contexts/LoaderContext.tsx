import React, { createContext, useContext, useState, ReactNode } from 'react';
import LoaderMf from '../commons/Loader/LoaderMf';

interface LoaderContextProps {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const preventDefaultHandler = (e: Event) => {
    e.preventDefault();
  };
  const showLoader = () => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', preventDefaultHandler, { passive: false });
    document.addEventListener('mousedown', preventDefaultHandler, { passive: false });
    document.addEventListener('wheel', preventDefaultHandler, { passive: false });
    setLoading(true)
  };
  const hideLoader = () => {
    document.body.style.overflow = 'visible';
    document.removeEventListener('keydown', preventDefaultHandler);
    document.removeEventListener('mousedown', preventDefaultHandler);
    document.removeEventListener('wheel', preventDefaultHandler);
    setLoading(false)
  };

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      <LoaderMf/> 
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextProps => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
