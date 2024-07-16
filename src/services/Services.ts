import * as AxiosFunctions from '../../src/functions/AxiosFunctions'
import { Buffer } from 'buffer'
import { ENV_CONFIG } from '../commons/Constants/Constants';


export interface AgreementListItem {
    actions: any;
    creator: any;
    dateCreated: string;
    dateModified: string;
    externalReferenceCode: string;
    id: number;
    status: any;
    clinic:boolean;
    value: string;
    entity: string;
    text: string;
}

const getAgreements = async(tokenMw:string) =>{
    let responseAgreements;
  
    const headersLFR = {
      'headers':{
        'Content-Type': 'application/json',
        'x-token-key': tokenMw
      },
    };
    try {
        responseAgreements = await AxiosFunctions.getMethod(ENV_CONFIG.MIDDLEWARE_MS_URL+"/agreements", 
        headersLFR
        );
        const arrayItemsAgreements = responseAgreements.data.items;
        return arrayItemsAgreements
    } catch (error) {
        return error
    }
}
const postInfolaft = async(userName:string, userId:string,tokenMw:string) =>{
    let responseInfolaft;
    const params = JSON.stringify ({
        'name': userName,
        'documentNumber': userId
    });
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'x-token-key': tokenMw
    };
    try {
        responseInfolaft = await AxiosFunctions.postMethod(ENV_CONFIG.MIDDLEWARE_MS_URL+"/search-paginated", 
        params,
        {headers}
        )
        return responseInfolaft
    } catch (error) {
        return error
    }
}
const postCoverage = async(userTypeId:string, userId:string, tokenMw:string, currentDate:string) =>{
    let responseCoverage;
    var paramsCoverage = JSON.stringify ({
        "tranDate": currentDate,
        "documentType": userTypeId,
        "documentNumber": userId
    });
    const headersCoverage={
        'headers':{
            'Content-Type': 'application/json',
            'x-token-key': tokenMw
        }
    }
    try {
        responseCoverage = await AxiosFunctions.postMethod(ENV_CONFIG.MIDDLEWARE_MS_URL+"/coverage", 
        paramsCoverage,
        headersCoverage
        )
        return responseCoverage
    } catch (error) {
        return error
    }
}
const postTyC = async(userTypeId:string, userId:string, currentDate:Date, tokenMw:string) =>{
    let responseTyC;
    var paramsPostTyC = JSON.stringify ({
        "acceptDate": currentDate,
        "documentNumber": userId,
        "documentType": userTypeId
    });
    const headersLFR = {
      'headers':{
        'Content-Type': 'application/json',
        'x-token-key': tokenMw
      },
    };
    try {
        responseTyC = await AxiosFunctions.postMethod(ENV_CONFIG.MIDDLEWARE_MS_URL+"/terms",
        paramsPostTyC,
        headersLFR
        )
        return responseTyC
    } catch (error) {
        return error
    }
}
const getTokenMiddleware = async() =>{
    let responseTokenBukeala;
    var paramsTokenBukeala = JSON.stringify ({
        "username": ENV_CONFIG.MS_USERNAME,
        "key": ENV_CONFIG.MS_KEY
    });
    const headersTokenBukeala = {
        'headers':{
            'Content-Type': 'application/json',
        },
    }
    try {
        responseTokenBukeala = await AxiosFunctions.postMethod(ENV_CONFIG.MIDDLEWARE_MS_URL+"/auth/login",
        paramsTokenBukeala,
        headersTokenBukeala
        )
        return responseTokenBukeala
    } catch (error) {
        return error
    }
}
const getUrlBukeala = async(tokenMwBukeala:string,userId:string,typeId:string,agreement:string,userName:string,userGender:string,userDate:string) =>{
    let responseUrlBukeala;
    var paramsUrlBukeala = JSON.stringify ({
    "codigoPlan": agreement,
    "numeroIdentificacion": userId,
    "tipoIdentificacion": typeId,
    "nombre":userName,
    "apellido": "",
    "genero": userGender,
    "fechaDeNacimiento": userDate
    });
    const headersUrlBukeala = {
        'headers':{
            'Content-Type': 'application/json',
            'x-token-key': tokenMwBukeala,
        },
    }
    try {
        responseUrlBukeala = await AxiosFunctions.postMethod(ENV_CONFIG.MIDDLEWARE_MS_URL+"/bukeala/getPortalCustomerUrl",
        paramsUrlBukeala,
        headersUrlBukeala
        )
        return responseUrlBukeala
    } catch (error) {
        return error
    }
}
const validateRecaptcha = async(tokenRecaptcha:string, tokenMwBukeala: string) =>{
    let responseRecaptcha;
    var paramsRecaptcha = JSON.stringify ({
    "token": tokenRecaptcha,
    });
    const headersRecaptcha = {
        'headers':{
            'Content-Type': 'application/json',
            'x-token-key': tokenMwBukeala,
        },
    }
    try {
        responseRecaptcha = await AxiosFunctions.postMethod(ENV_CONFIG.MIDDLEWARE_MS_URL+"/bukeala/validate-recaptcha",
        paramsRecaptcha,
        headersRecaptcha
        )
        return responseRecaptcha
    } catch (error) {
        return error
    }
}

export{
    getAgreements,
    postInfolaft,
    postCoverage,
    postTyC,
    getTokenMiddleware,
    getUrlBukeala,
    validateRecaptcha
}