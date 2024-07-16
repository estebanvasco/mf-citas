import './SelectFormMf.scss'
import IconTypeId from '../../assets/icons/branding_watermark.png'
import IconGender from '../../assets/icons/venus-mars.png'
import IconAgreement from '../../assets/icons/building.png'
import IconSelect from '../../assets/icons/navigate_next.png'
import { useEffect, useRef, useState } from 'react'

interface ListItem {
  id: string; 
  value: string;
  bukealaId?: string;
}

interface SelectProps{
  styleCustomize: 'k-select--no-selected' | 'k-select--selected';
  valueInserted : string;
  idSelect: string;
  labelCustomize: string;
  iconCustomize: string;
  altIcon: string;
  optionsSelect: Array<ListItem>;
  placeholderSelect: string;
  onChange?: (event:any) => void;
}

const iconToDisplay = (nameIcon : string) => {
  switch (nameIcon) {
    case "iconTypeId":
      return IconTypeId
    case "iconGender":
      return IconGender
    case "iconAgreement":
      return IconAgreement
    default:
      break;
  }
}

const SelectFormMf = ({
  styleCustomize,
  valueInserted,
  labelCustomize,
  idSelect,
  iconCustomize,
  altIcon,
  optionsSelect,
  placeholderSelect,
  onChange,
  ...props
}: SelectProps) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const elementoRef = useRef<HTMLDivElement | null>(null); 
  useEffect(() => {
    setShowDropDown(false)
  }, [valueInserted])

  useEffect(() => {
    const handleClicOutElement = (event:any) => {
      if (elementoRef.current && !elementoRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener('click', handleClicOutElement);
    return () => {
      document.removeEventListener('click', handleClicOutElement);
    };
  }, []);

  const handleShowDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  return (
    <div className='k-select' ref={elementoRef}>
      <label htmlFor={idSelect}>{labelCustomize} <span>*</span></label>
      <img src={iconToDisplay(iconCustomize)} alt={altIcon} className={valueInserted !== "" ? 'k-select__img-dark':''}/>
      <div id={idSelect} className="k-select__select-input" onClick={handleShowDropDown} tabIndex={0}>
          <span className={styleCustomize}>{valueInserted === "" ? placeholderSelect:valueInserted}</span>
      </div>
      {showDropDown?
      <div className='k-select__options-select'>
        <ul>
        {optionsSelect.map((option, index)=>(
          <li key={index} id={option.id} onClick={onChange}>{option.value}</li>
        ))}
        </ul>
      </div>:
      <></>
      }
      <img className='k-select__icon-arrow-down' src={IconSelect} alt='Icono flecha selector '/>
    </div>
  )
}

export default SelectFormMf