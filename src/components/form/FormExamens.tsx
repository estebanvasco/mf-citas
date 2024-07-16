import React from "react";
import { useState } from "react";
import './FormExamens.scss'
import ButtonFormMf from '../../commons/Button/ButtonFormMf'
import InputFormMf from '../../commons/Input/InputFormMf'
import SelectFormMf from '../../commons/Select/SelectFormMf'
import { LiferayProps } from "../.."; 
import jsonData from './cardsprueba.json';




const FormExamens: React.FC<LiferayProps> = (props) => {
    
    interface CardData {
        id: number;
        title: string;
        description: string;
      }

      interface CardProps {
        cardData: CardData;     
    }

    const [cards, setCards] = useState<CardData[]>([]);

    return (
        <> 
            <section className='mf-k-form-container'>
                <h1>Exámenes</h1>
                <div className="k-form-inputs">
                    <InputFormMf placeholderCustomize={""} styleCustomize={""} maxLenghtCustomize={6} typeInput={"number"} idInput={""} labelCustomize={""} iconCustomize={""} altIcon={""}/>
                    <InputFormMf placeholderCustomize={""} styleCustomize={""} maxLenghtCustomize={3} typeInput={"number"} idInput={""} labelCustomize={""} iconCustomize={""} altIcon={""}/>
                    <InputFormMf placeholderCustomize={""} styleCustomize={""} maxLenghtCustomize={30} typeInput={"text"} idInput={""} labelCustomize={""} iconCustomize={""} altIcon={""}/>
                    <SelectFormMf styleCustomize={"k-select--no-selected"} valueInserted={""} idSelect={""} labelCustomize={""} iconCustomize={""} altIcon={""} optionsSelect={[]} placeholderSelect={""}/>
                    <button>Buscar</button>
                </div>
                <div className="k-cards-container">
                    <h1>resultados</h1>
                    <div className="card-list">
                        {cards.map((card) => (
                            <div className="card" key={card.id}>
                                <h2>{card.title}</h2>
                                <p>{card.description}</p>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </section>
        </>
    );
}

export default FormExamens;