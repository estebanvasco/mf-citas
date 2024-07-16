// CardList.tsx

import React from 'react';
import { useState } from 'react';
import Card from './Card'; // Importamos el componente Card
import './Card.scss';
import jsonData from '../form/cardsprueba.json'; // Importamos el JSON

// Definimos una interfaz para el JSON (opcional, pero recomendado)
interface CardData {
  id: number;
  title: string;
  description: string;
}

const CardList: React.FC = () => {
  // Puedes utilizar useState para almacenar los datos si son dinámicos
  // const [cards, setCards] = useState<CardData[]>(jsonData);

  // Si los datos son estáticos, simplemente accedemos al JSON directamente
  const [cards, setCards] = useState<CardData[]>(jsonData);

  return (
    <div className="k-card-list">
      {cards.map((card) => (
        <Card key={card.id} cardData={card} />
      ))}
    </div>
  );
};

export default CardList;
