import React from 'react'
import './ButtonFormMf.scss'
/* import Embed from 'react-embed'; */

interface btnProps{
  styleCustomize: string;
  txtButton : string;
  onClick?: (event:any) => void;
  disabledButton: boolean;
}

const ButtonFormMf = ({
  styleCustomize,
  txtButton,
  disabledButton,
  onClick,
  ...props
}:btnProps) => {
  return (
    <div className='k-button-primary'>
      <button disabled={disabledButton} className={styleCustomize} onClick={onClick}>
        {txtButton}
      </button>
    </div>
  )
}

export default ButtonFormMf