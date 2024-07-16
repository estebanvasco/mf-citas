import React from 'react';
import { useLoader } from '../../contexts/LoaderContext';
import './LoaderMf.scss';
import { ENV_CONFIG } from '../Constants/Constants';

const LoaderMf: React.FC = () => {
  const { loading } = useLoader();

  return loading ? 
  <div className="k-loader">
    <img src={ENV_CONFIG.LOADER_SRC} alt="Gif de carga" className='k-loader__k-loader-gif'/>
  </div> : null;
};

export default LoaderMf;
