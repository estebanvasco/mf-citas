import React, { useEffect, useRef, useState } from 'react'
import ButtonFormMf from '../../commons/Button/ButtonFormMf'
import InputFormMf from '../../commons/Input/InputFormMf'
import SelectFormMf from '../../commons/Select/SelectFormMf'
import DatePickerMf from '../../commons/DatePicker/DatePickerMf'
import * as Services from '../../services/Services'
import * as Functions from '../../functions/Functions'
import './FormMf.scss'
import Embebed from '../bukeala/Embebed'
import { useLoader } from '../../contexts/LoaderContext'
import IconAgreement from '../../assets/icons/building.png'
import IconSelect from '../../assets/icons/navigate_next.png'
import { AgreementListItem } from '../../services/Services'
import Select from 'react-select';
import { useModal } from '../../contexts/ModalContext'
import ReCAPTCHA from 'react-google-recaptcha'
import { CONSTANTS, ENV_CONFIG, GENDERLIST, TYPEIDLIST } from '../../commons/Constants/Constants'
import { LiferayProps } from '../..'

const FormMf:React.FC<LiferayProps> = ({ properties }) => {
  const [inputId, setInputId] = useState("")
  const [inputName, setInputName] = useState("")
  const [selectTypeIdValue, setTypeIdValue] = useState("")
  const [selectIdTypeIdValue, setIdTypeValue] = useState("")
  const [typeIdBukeala, setIdTypeBukeala] = useState<any>("")
  const [selectAgreementValue, setAgreementValue] = useState<any>("")
  const [selectGenderValue, setGenderValue] = useState<string>("")
  const [checkBoxTerms, setValueTerms] = useState(false)
  const [disabledButton, setStateButton] = useState(true)
  const [classDisabledBtn, setClassDisabledBtn] = useState("k-button-primary--disabled")
  const [agreementList, setAgreementList] = useState(Array<AgreementListItem>)
  const [currentDate, setCurrentDate] = useState<string>("")
  const [tokenMs, setTokenMs] = useState("")
  const [urlEmbed, setUrlEmbed] = useState("")
  const [recaptchaValue, setRecaptchaValue] = useState<string>("")
  const [validateInfolaft, setValidateInfolaft] = useState("")
  const [showAgreementSelect, setShowAgreementSelect] = useState("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const { showLoader, hideLoader } = useLoader()
  const { showModal, closeModal } = useModal()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const currentDateNoFormatted = new Date()
  
  useEffect(() => {
    handleButton();
  }, [inputId,inputName,selectTypeIdValue,selectAgreementValue,selectGenderValue,checkBoxTerms,recaptchaValue,selectedDate]);

  useEffect(() => {
    getTokenMiddleware();
  }, []);

  useEffect(() => {
    setCurrentDate(Functions.dateMf());
    environmentValues();
  }, []);

  useEffect(() => {
  }, [urlEmbed]);
  
  const environmentValues = () => {
    if(ENV_CONFIG.ENVIRONMENT === "PRD"){
      setValidateInfolaft(properties.validate_infolaft || "true");
      setShowAgreementSelect(properties.show_agreement || "true");
    }else if(ENV_CONFIG.ENVIRONMENT === "DEV") {
      setValidateInfolaft("true");
      setShowAgreementSelect("true");
    }
  }
 
  const showModalError = () =>{
    showModal({
      titleModal: CONSTANTS.MODAL_ERROR.TITLE_MODAL,
      paragraphModal: CONSTANTS.MODAL_ERROR.PARAGRAPH_MODAL,
      btnClose: true,
      secondBtn: false,
      textBtn: CONSTANTS.MODAL_ERROR.BUTTON_MODAL,
      onClick:closeModal,
      onClickPrimaryBtn:closeModal,
    });
  }
  const handleRecaptchaChange = (value:string | null) => {
    if (value) {
      setRecaptchaValue(value);
    }
  };
  const handleRecaptchaExpired = () => {
    setRecaptchaValue("");
  };

  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setRecaptchaValue("");
    }
  };
  const getListAgreements = (newTokenMs:string) =>{
    showLoader();
    Promise.all([Services.getAgreements(newTokenMs)])
    .then(([responseAgreements])=> {
      const transformedOptions:any[] = responseAgreements.map((option:any) => ({
        value: option.value,
        label: option.text,
      }));
      setAgreementList(transformedOptions)
      hideLoader();
    }).catch((error)=>{
      hideLoader();
      showModalError();
    })
  }
  const getTokenMiddleware = () =>{
    showLoader();
    Promise.all([Services.getTokenMiddleware()])
    .then(([responseTokenBukeala])=> {
      const tokenMsMiddleware = responseTokenBukeala?.data?.accessToken;
      setTokenMs(tokenMsMiddleware);
      getListAgreements(tokenMsMiddleware);
    }).catch((error)=>{
      hideLoader();
      showModalError();
    })
  }
  
  const refreshTokenMw = () => {
    showLoader();
    Promise.all([Services.getTokenMiddleware()])
    .then(([responseTokenBukeala])=> {
      const tokenMsMiddleware = responseTokenBukeala?.data?.accessToken;
      setTokenMs(tokenMsMiddleware);
      hideLoader();
      validationRecaptcha(tokenMsMiddleware);
    }).catch((error)=>{
      hideLoader();
      showModalError();
    })
  }
  const validationRecaptcha = (tokenMdw:string) =>{
    showLoader();
    Promise.all([Services.validateRecaptcha(recaptchaValue,tokenMdw)])
    .then(([responseRecaptcha])=> {
      const dataResponse = responseRecaptcha?.data?.success;
      if(dataResponse === true){
        handleTransactionalFlow(tokenMdw);
      }else if(responseRecaptcha?.response?.status === 401){
        refreshTokenMw();
      }else{
        hideLoader();
        showModalError();
      }
    }).catch((error)=>{
        hideLoader();
        showModalError();
    })
  }
  const postTyc = (userTypeId:string,userId:string,tokenMdw:string)=> {
    showLoader();
    Promise.all([Services.postTyC(userTypeId,userId,currentDateNoFormatted,tokenMdw)])
    .then(([responseTyC])=> {
      const dataResponse = responseTyC?.status;
      const dataMessage = responseTyC?.data?.message;
      if(dataResponse === 200 && dataMessage == "Success"){
        if (validateInfolaft === "true"){
          getDataInfolaft(tokenMdw);
        }else{
          postCoverageApi(selectIdTypeIdValue,inputId,tokenMdw);
        }
      }else{
        hideLoader();
        showModalError();
      }
    }).catch((error)=>{
        hideLoader();
        showModalError();
    })
  }
  const handleTransactionalFlow = (tokenMdw:string) =>{
    postTyc(selectIdTypeIdValue,inputId,tokenMdw);
  }
  const getDataInfolaft = (tokenMdw:string) =>{
    showLoader();
    Promise.all([Services.postInfolaft(inputName,inputId,tokenMdw)])
    .then(([responseInfolaft])=> {
      const dataInfolaft = responseInfolaft?.data?.data;
      if((dataInfolaft?.content?.length === 0)|| (dataInfolaft.empty)){
        postCoverageApi(selectIdTypeIdValue,inputId,tokenMdw);
      }else{
        hideLoader();
        showModal({
          titleModal: CONSTANTS.MODAL_INFOLAFT.TITLE_MODAL,
          paragraphModal: CONSTANTS.MODAL_INFOLAFT.PARAGRAPH_MODAL,
          btnClose: true,
          secondBtn: false,
          textBtn: CONSTANTS.MODAL_INFOLAFT.BUTTON_MODAL,
          onClick:closeModal,
          onClickPrimaryBtn:closeModal,
        });
        resetRecaptcha();
      }
    }).catch((error)=>{
      hideLoader();
      showModalError();
    })
  }
  const getUrlMfBukeala = (tokenBukeala:string) =>{
    showLoader();
    let codeAgreement;
    if(showAgreementSelect === "true"){
      codeAgreement = selectAgreementValue.value;
    }else{
      codeAgreement = "120";
    }
    Promise.all([Services.getUrlBukeala(tokenBukeala,inputId,typeIdBukeala,codeAgreement,inputName,Functions.formatGender(selectGenderValue),selectedDate)])
    .then(([responseUrlBukeala])=> {
      if(responseUrlBukeala?.status===200){
        const urlMwBukeala = responseUrlBukeala?.data?.url;
        hideLoader();
        setUrlEmbed(urlMwBukeala)
      }else{
        hideLoader();
        showModalError();
      }
    }).catch((error)=>{
      hideLoader();
      showModalError();
    })
  }
  const postCoverageApi = (userTypeId:string, userId:string, tokenMw:string) =>{
    showLoader();
    Promise.all([Services.postCoverage(userTypeId,userId,tokenMw,currentDate)])
    .then(([responseCoverage])=> {
      const dataCoverage = responseCoverage?.data;
      if(dataCoverage?.code === "COV02"){
        particularFlow(tokenMw);
        hideLoader();
      }else if(
        (dataCoverage?.data?.length === 1)&&
        (dataCoverage?.data[0]?.insurancePlan?.identifier[0]?.value === "30")&&
        (dataCoverage?.data[0]?.coverage[0]?.status?.code === "HABILITADO")
        ){
          hideLoader();
          showModal({
            titleModal: CONSTANTS.MODAL_SANITAS.TITLE_MODAL,
            paragraphModal: CONSTANTS.MODAL_SANITAS.PARAGRAPH_MODAL,
            btnClose: true,
            secondBtn: true,
            textBtn: CONSTANTS.MODAL_SANITAS.PRIMARY_BUTTON_MODAL,
            textSecondBtn: CONSTANTS.MODAL_SANITAS.SECONDARY_BUTTON_MODAL,
            onClick:closeModal,
            onClickPrimaryBtn: ()=> particularFlow(tokenMw),
            onClickSecondBtn: ()=> Functions.redirectFunction(ENV_CONFIG.EPS_SANITAS_URL)
          })
      }else if(
        (dataCoverage?.data?.length === 1)&&
        (dataCoverage?.data[0]?.insurancePlan?.identifier[0]?.value !== "30")&&
        (dataCoverage?.data[0]?.coverage[0]?.status?.code === "HABILITADO")
        ){
          hideLoader();
          showModal({
            titleModal: CONSTANTS.MODAL_PREPAGADA.TITLE_MODAL,
            paragraphModal: CONSTANTS.MODAL_PREPAGADA.PARAGRAPH_MODAL,
            btnClose: true,
            secondBtn: true,
            textBtn: CONSTANTS.MODAL_PREPAGADA.PRIMARY_BUTTON_MODAL,
            textSecondBtn: CONSTANTS.MODAL_PREPAGADA.SECONDARY_BUTTON_MODAL,
            onClick:closeModal,
            onClickPrimaryBtn:()=> particularFlow(tokenMw),
            onClickSecondBtn: ()=> Functions.redirectFunction(ENV_CONFIG.COLSANITAS_URL)
          })
      }else if(dataCoverage?.data?.length > 1){
        var validationProducts=0;
        for (let n = 0; n < dataCoverage.data.length; n++) {
          if (dataCoverage.data[n]?.coverage[0]?.status?.code === "HABILITADO") {
            validationProducts += 1;
          }
        }
        if (validationProducts>= 1){
          hideLoader();
          showModal({
            titleModal: CONSTANTS.MODAL_PREPAGADA.TITLE_MODAL,
            paragraphModal: CONSTANTS.MODAL_PREPAGADA.PARAGRAPH_MODAL,
            btnClose: true,
            secondBtn: true,
            textBtn: CONSTANTS.MODAL_PREPAGADA.PRIMARY_BUTTON_MODAL,
            textSecondBtn: CONSTANTS.MODAL_PREPAGADA.SECONDARY_BUTTON_MODAL,
            onClick:closeModal,
            onClickPrimaryBtn:()=> particularFlow(tokenMw),
            onClickSecondBtn: ()=> Functions.redirectFunction(ENV_CONFIG.COLSANITAS_URL)
          })
        }
      }else{
        hideLoader();
        resetRecaptcha();
        showModalError();
      }
    }).catch((error)=>{
      hideLoader();
      showModalError();
    })
  }
  const particularFlow = (tokenMdw:string) =>{
    closeModal();
    getUrlMfBukeala(tokenMdw);
  }
  const handleInputId = (event:any) =>{
    const valueId = event.target.value;
    const idFormated = /^[a-zA-Z0-9]*$/.test(valueId);
    if (idFormated) {
      setInputId(valueId);
    }
  }
  const handleInputName = (event:any) =>{
    const valueName = event.target.value;
    const nameFormated = /^[a-zA-Z0-9ñ ]*$/.test(valueName);
    if (nameFormated) {
      setInputName(valueName);
    }
  }
  const handleCheckbox = () => {
    setValueTerms(!checkBoxTerms);
  }
  const handleSelectGender = (event:any)=> {
    const valueGender = event.target.textContent;
    setGenderValue(valueGender);
  }
  const handleSelectTypeId = (event:any)=> {
    const valueTypeId = event.target.textContent;
    setTypeIdValue(valueTypeId);
    setIdTypeValue(event.target.id);
    const selectedOption = TYPEIDLIST.find(option => option.id === event.target.id);
    setIdTypeBukeala(selectedOption?.bukealaId);
  }
  const handleChangeDate = (date: any | null) => {
    const dateFormated = Functions.formatDateDMY(date);
    setSelectedDate(dateFormated);
  };

  const handleButton = () => {
    if((inputName !== "")&&
    (inputId !== "")&&
    (checkBoxTerms === true)&&
    (selectGenderValue !== "")&&
    (selectTypeIdValue !== "")&&
    (selectAgreementValue !== "" || showAgreementSelect === "false")&&
    (recaptchaValue !== "")&&
    (selectedDate !== "")
    ){
      setStateButton(false)
      setClassDisabledBtn("")
    }else{
      setStateButton(true)
      setClassDisabledBtn("k-button-primary--disabled")
    }
  }
  const submitForm = () => {
    validationRecaptcha(tokenMs);
  }
  return (
    <>
    {((urlEmbed === "") || (urlEmbed=== null))?
    <section className='mf-k-form-container'>
      <div className='k-form-title'>
        <h1>
          {CONSTANTS.FORM.TITLE_FORM}
        </h1>
      </div>
      <div className='k-form-inputs'>
        <SelectFormMf
          idSelect='idType'
          labelCustomize= {CONSTANTS.FORM.LABEL_TYPE_ID}
          styleCustomize={selectTypeIdValue === '' ? 'k-select--no-selected': 'k-select--selected'}
          valueInserted={selectTypeIdValue}
          iconCustomize='iconTypeId'
          altIcon='Icono numero de documento'
          optionsSelect={TYPEIDLIST}
          placeholderSelect={CONSTANTS.FORM.PLACEHOLDER_TYPE_ID}
          onChange={handleSelectTypeId}
        />
        <InputFormMf
          idInput='idValue'
          labelCustomize={CONSTANTS.FORM.LABEL_ID}
          typeInput='text'
          styleCustomize=''
          maxLenghtCustomize={20}
          valueInserted={inputId}
          placeholderCustomize={CONSTANTS.FORM.PLACEHOLDER_ID}
          iconCustomize='iconId'
          altIcon='Icono numero de documento'
          onChange={handleInputId}
        />
        <InputFormMf
          idInput='nameValue'
          labelCustomize={CONSTANTS.FORM.LABEL_NAME}
          typeInput='text'
          styleCustomize=''
          maxLenghtCustomize={250}
          valueInserted={inputName}
          placeholderCustomize={CONSTANTS.FORM.PLACEHOLDER_NAME}
          iconCustomize='iconName'
          altIcon='Icono nombres y apellidos'
          onChange={handleInputName}
        />
        <DatePickerMf onChangeDate={handleChangeDate}/>
        <SelectFormMf
          idSelect='genderValue'
          labelCustomize={CONSTANTS.FORM.LABEL_GENDER}
          styleCustomize={selectGenderValue === '' ? 'k-select--no-selected': 'k-select--selected'}
          valueInserted={selectGenderValue}
          iconCustomize='iconGender'
          altIcon='Icono género'
          optionsSelect={GENDERLIST}
          placeholderSelect={CONSTANTS.FORM.PLACEHOLDER_GENDER}
          onChange={handleSelectGender}
        />
        {showAgreementSelect=== "true" ?
          <div className='k-select-agreement'>
            <div className='k-select k-select--agreements'>
              <label htmlFor='agreementValue'>{CONSTANTS.FORM.LABEL_AGREEMENT} <span>*</span></label>
              <img src={IconAgreement} alt='Icono covenio' className={selectAgreementValue !== "" ? 'img-dark':''}/>
                <Select 
                  id='agreementValue'
                  options={agreementList}
                  isSearchable= {true}
                  placeholder={CONSTANTS.FORM.PLACEHOLDER_AGREEMENT}
                  className="react-select-mf"
                  classNamePrefix="react-select-mf"
                  value={selectAgreementValue}
                  onChange={(selected) => setAgreementValue(selected)}
                  tabIndex={0}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? 'transparent' : 'transparent',
                    }),
                  }}
                />
              <img className='k-select__icon-arrow-down' src={IconSelect} alt='Icono flecha selector '/>
            </div>
            <span className='k-select-agreement__help-text' dangerouslySetInnerHTML={{ __html: CONSTANTS.FORM.HELP_TEXT }} />
          </div>
          :<></>
        }
      </div>
      <div className='k-terms'>
        <div className='k-terms__checkbox' onClick={handleCheckbox}>
          <input type="checkbox" checked={checkBoxTerms} onChange={handleCheckbox}/>
        </div>
        <a href={ENV_CONFIG.TERMS_URL} target='_blank' rel='noreferrer'>{CONSTANTS.FORM.TYC}</a>
      </div>
      <div className='k-recaptcha'>
        <ReCAPTCHA
          sitekey={ENV_CONFIG.RECAPTCHA_KEY}
          onChange={handleRecaptchaChange}
          onExpired={handleRecaptchaExpired}
          ref={recaptchaRef}
        />
      </div>
      <ButtonFormMf
        txtButton={CONSTANTS.FORM.BUTTON_FORM}
        styleCustomize={classDisabledBtn}
        disabledButton={disabledButton} 
        onClick={submitForm}
      />
    </section>
    :
    <Embebed url={urlEmbed} />
    }
    </>
  )
}

export default FormMf