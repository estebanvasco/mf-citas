import React from "react";
import { useState } from "react";
import './FormExamens.scss'
import ButtonFormMf from '../../commons/Button/ButtonFormMf'
import InputFormMf from '../../commons/Input/InputFormMf'
import SelectFormMf from '../../commons/Select/SelectFormMf'
import { CONSTANTS } from "../../commons/Constants/Constants";
import Pagination from '../pagination/Pagination';


import { LiferayProps } from "../.."; 
import Card from "../cardList/CardList";

interface CardData {
    id: number;
    title: string;
    description: string;
  }


const FormExamens: React.FC<LiferayProps> = (props) => {

    return (
        <> 
            <section className='mf-k-form-container'>
                <h1>Exámenes</h1>
                <div className="k-form-inputs">
                    <InputFormMf placeholderCustomize={""} styleCustomize={""} maxLenghtCustomize={6} typeInput={"number"} idInput={""} labelCustomize={"Código CUPS"} iconCustomize={""} altIcon={""}/>
                    <InputFormMf placeholderCustomize={""} styleCustomize={""} maxLenghtCustomize={3} typeInput={"number"} idInput={""} labelCustomize={"Código Laboratorio"} iconCustomize={""} altIcon={""}/>
                    <InputFormMf placeholderCustomize={""} styleCustomize={''} maxLenghtCustomize={30} typeInput={"text"} idInput={""} labelCustomize={"Nombre de la prueba"} iconCustomize={""} altIcon={""}/>
                    <SelectFormMf styleCustomize={"k-select--no-selected"} valueInserted={""} idSelect={""} labelCustomize={"Tipo de muestra"} iconCustomize={""} altIcon={""} optionsSelect={[]} placeholderSelect={""}/>
                    <ButtonFormMf
                        txtButton={"Continuar"}
                        styleCustomize='k-button-form'
                        disabledButton={false}
                        onClick={() => {}}
                    />
                </div>
                <div className="k-cards-container">
                   <Card />
                </div>
            </section>
            
        </>
    );
}

export default FormExamens;