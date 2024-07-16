import './InputFormMf.scss'
import IconId from '../../assets/icons/User.png'
import IconName from '../../assets/icons/assignment_ind.png'

interface InputProps{
  placeholderCustomize: string;
  styleCustomize: '' | '';
  maxLenghtCustomize: number;
  valueInserted? : string;
  typeInput: 'text' | 'number';
  idInput: string;
  labelCustomize: string;
  iconCustomize: string;
  altIcon: string;
  onChange?: (event:any) => void;
}

const iconToDisplay = (nameIcon : string) => {
  switch (nameIcon) {
    case "iconName":
      return IconId
    case "iconId":
      return IconName
    default:
      break;
  }
}
const handleOnPaste = (event:any) =>{
  event.preventDefault();
}
const InputFormMf = ({
  placeholderCustomize,
  styleCustomize,
  maxLenghtCustomize,
  valueInserted,
  typeInput,
  idInput,
  labelCustomize,
  iconCustomize,
  altIcon,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div className='k-input'>
      <label htmlFor={idInput}>{labelCustomize} <span>*</span></label>
      <img src={iconToDisplay(iconCustomize)} alt={altIcon} className={valueInserted !== "" ? 'k-input__img-dark':''} />
      <input
        id={idInput}
        type={typeInput} 
        className={styleCustomize} 
        placeholder={placeholderCustomize}
        maxLength={maxLenghtCustomize}
        value={valueInserted}
        onChange={onChange}
        onPaste={handleOnPaste}
      />
    </div>
  )
}

export default InputFormMf