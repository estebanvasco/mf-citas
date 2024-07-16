import React, { useState } from 'react'
import iconDate from '../../assets/icons/calendar.png'
import DatePicker, {registerLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import './DatePickerMf.scss'
import { CONSTANTS } from '../Constants/Constants'
import es from "date-fns/locale/es";
registerLocale("es", es);

interface DatePickerProps {
  onChangeDate: (date: Date | null) => void;
}


const DatePickerMf: React.FC<DatePickerProps>  = ({ onChangeDate }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const todayDate = new Date();
  
  const CustomInput = React.forwardRef<HTMLInputElement, { value?: string; onClick?: () => void }>(
    ({ value, onClick }, ref) => (
      <div onClick={onClick}>
        <img src={iconDate} alt="Icono de calendario" className={selectedDate !== null ? 'k-datepicker__img k-datepicker__img-dark' : 'k-datepicker__img'}/>
        <input type="text" className='k-datepicker__input' placeholder={CONSTANTS.FORM.PLACEHOLDER_DATE} defaultValue={value} id="mf-date-picker" readOnly/>
      </div>
    )
  );

  const handleChangeDate = (date: any | null) => {
    setSelectedDate(date);
    onChangeDate(date)
  };
  
  return (
    <div className='k-datepicker'>
      <label className='k-datepicker__label' htmlFor="mf-date-picker">{CONSTANTS.FORM.LABEL_DATE} <span>*</span></label>
      <DatePicker 
        selected={selectedDate} 
        onChange={handleChangeDate}
        showMonthDropdown
        showYearDropdown
        dateFormat="dd/MM/yyyy"
        customInput={<CustomInput />}
        maxDate={todayDate}
        locale="es"
        >
      </DatePicker>
    </div>
  )
}

export default DatePickerMf