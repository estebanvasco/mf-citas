import './ModalsMf.scss'
import CloseIcon from '../../assets/icons/closeIcon.png'
import { ModalMfProps } from '../../contexts/ModalContext'
import { useCallback, useEffect, useRef } from 'react';

const ModalsMf = ({
    titleModal,
    paragraphModal,
    btnClose,
    textBtn,
    secondBtn,
    textSecondBtn,
    onClick,
    onClickPrimaryBtn,
    onClickSecondBtn,
  ...props
}: ModalMfProps) => {

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      modalRef.current?.focus();
    }
  }, []);
  
  return (
    <div className={`k-modals k-modal--opened`} id='k-modal' tabIndex={0} ref={modalRef}>
        {btnClose? 
            <img src={CloseIcon} alt="Icono de cerrar modal" className='k-modals__img-close' tabIndex={0} onClick={onClick} />
            : <></>
        }
        <hr className='k-modals__hr-mobile'/>
        <h1 className='k-modals__title-modal'>{titleModal}</h1>
        <hr className='k-modals__hr'/>
        <hr className='k-modals__hr-gray'/>
        <p className='k-modals__paragraph-modal' dangerouslySetInnerHTML={{ __html: paragraphModal }} />
        {secondBtn?
            <div className='k-modals__section-buttons'>
                <button className='k-modals__secondary-button' onClick={onClickSecondBtn} >{textSecondBtn}</button>
                <button className='k-modals__primary-button' onClick={onClickPrimaryBtn}  onKeyDown={handleKeyDown} >{textBtn}</button>
            </div>
            :
            <div className='k-modals__section-button'>
                <button className='k-modals__primary-button' onClick={onClickPrimaryBtn}  onKeyDown={handleKeyDown} >{textBtn}</button>
            </div>
        }
            
    </div>
  )
}

export default ModalsMf