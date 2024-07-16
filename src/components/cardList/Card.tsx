// Card.tsx

import React from 'react';
import { useState } from 'react';
import ButtonFormMf from '../../commons/Button/ButtonFormMf';
import {CONSTANTS} from '../../commons/Constants/Constants';


// Interfaz que describe la estructura de cada elemento en el JSON
interface CardData {
  id: number;
  title: string;
  description: string;
}


// Propiedades que espera el componente Card
interface CardProps {
  cardData: CardData;
}

const Card: React.FC<CardProps> = ({ cardData }) => {

    
  const [disabledButton, setStateButton] = useState(true)    
  const [classDisabledBtn, setClassDisabledBtn] = useState("k-button-primary")

  return (
    <div className="k-card">
        <div className='k-cardText'>
            <p className='k-cardText__title'>{cardData.title}</p>
            <p className='k-cardText__description'>{cardData.description}</p>
        </div>
      <ButtonFormMf
        txtButton={CONSTANTS.FORM.BUTTON_FORM}
        styleCustomize='k-button-primary'
        disabledButton={disabledButton}
        onClick={() => {}}
        />
    </div>
  );
};

export default Card;
