import { LiferayProps } from '.';
import './App.css';
import FormMf from './components/form/FormMf';
import FormExamens from './components/form/FormExamens';
import { LoaderProvider } from './contexts/LoaderContext';
import { ModalProvider } from './contexts/ModalContext';

const App:React.FC<LiferayProps> = ({ properties }) => {
  return (
    <>
    <ModalProvider>
      <LoaderProvider>
        <FormExamens properties={properties}/>
      </LoaderProvider>
    </ModalProvider>
    </>
  );
}

export default App;