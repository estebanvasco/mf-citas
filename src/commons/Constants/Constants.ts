export const CONSTANTS = {
    /* Modal de error */
    MODAL_ERROR:{
        TITLE_MODAL: "Aviso",
        PARAGRAPH_MODAL: "Lo sentimos, estamos presentando inconvenientes, inténtalo mas tarde.",
        BUTTON_MODAL: "Aceptar"
    },
    /* Modal de coincidencia en listas restrictivas */
    MODAL_INFOLAFT:{
        TITLE_MODAL: "Aviso",
        PARAGRAPH_MODAL: "Lo sentimos, debido a una coincidencia en los datos de nombre y número de documento tu proceso de registro será revisado en las próximas 24 horas. Por favor, cumplido este periodo inténtalo nuevamente. En caso de persistir acérquese al punto de atención más cercano.",
        BUTTON_MODAL: "Aceptar"
    },
    /* Modal plan en EPS Sanitas Habilitado */
    MODAL_SANITAS:{
        TITLE_MODAL: "Aviso",
        PARAGRAPH_MODAL: "Estimado usuario, ya cuentas con un plan de <strong>EPS Sanitas.</strong> Las consultas, trámites y solicitudes las podrás realizar directamente en tu Oficina virtual.",
        PRIMARY_BUTTON_MODAL: "Seguir como particular",
        SECONDARY_BUTTON_MODAL: "Ir a EPS Sanitas",
    },
    /* Modal plan en medicina prepagada Habilitado */
    MODAL_PREPAGADA:{
        TITLE_MODAL: "Aviso",
        PARAGRAPH_MODAL: "Estimado usuario, ya cuentas con un plan de <strong>medicina prepagada.</strong> Las consultas, trámites y solicitudes las podrás realizar directamente en tu Oficina virtual.",
        PRIMARY_BUTTON_MODAL: "Seguir como particular",
        SECONDARY_BUTTON_MODAL: "Ir a Colsanitas",
    },
    /* Formulario */
    FORM:{
        TITLE_FORM: "Diligencia el siguiente formulario para agendar una cita médica",
        LABEL_TYPE_ID: "Tipo de documento",
        PLACEHOLDER_TYPE_ID: "Selecciona el tipo",
        LABEL_ID: "Número de documento",
        PLACEHOLDER_ID: "Ingresa el número",
        LABEL_NAME: "Nombres y apellidos",
        PLACEHOLDER_NAME: "Ingresa el nombre",
        LABEL_DATE: "Fecha de nacimiento",
        PLACEHOLDER_DATE: "DD/MM/AAAA",
        LABEL_GENDER: "Género",
        PLACEHOLDER_GENDER: "Selecciona el género",
        LABEL_AGREEMENT: "Convenio",
        PLACEHOLDER_AGREEMENT: "Selecciona el convenio",
        HELP_TEXT: "Selecciona el convenio empresarial al que perteneces. En caso de no tener un convenio, selecciona la opción <strong>Particular 120.</strong>",
        TYC: "Acepto Términos y Condiciones",
        BUTTON_FORM: "Continuar"
    },
}
/* Lista tipos de identificación */
export const TYPEIDLIST = [
    {id: "CC", value: "Cédula de ciudadanía", bukealaId: "1"},
    {id: "TI", value: "Tarjeta de identidad", bukealaId: "8"},
    {id: "RC", value: "Registro civil", bukealaId: "7"},
    {id: "CE", value: "Cédula de extranjería", bukealaId: "2"}
]
/* Lista para selector de género */
export const GENDERLIST = [
    {id: "M", value: "Masculino"},
    {id: "F", value: "Femenino"}
]
/* Variables de entorno */
export const ENV_CONFIG = {
    ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || "",
    RECAPTCHA_KEY: process.env.REACT_APP_RECAPTCHA_KEY || "",
    TERMS_URL: process.env.REACT_APP_TERMS_URL || "",
    COLSANITAS_URL: process.env.REACT_APP_COLSANITAS_URL || "",
    EPS_SANITAS_URL: process.env.REACT_APP_EPSSANITAS_URL || "",
    MS_USERNAME: process.env.REACT_APP_MS_USERNAME || "",
    MS_KEY: process.env.REACT_APP_MS_KEY || "",
    LOADER_SRC: process.env.REACT_APP_IMG_LOADER || "",
    MIDDLEWARE_MS_URL: process.env.REACT_APP_MIDDLEWARE_MS_URL || ""
}
