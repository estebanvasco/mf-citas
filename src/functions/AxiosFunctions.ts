import axios from "axios";

const getMethod = async (url:string, headers:any)=> {
    let response = await axios.get(url,headers)
        .then(function (response) {
            return response;
        })
        .catch(function (error){
            console.log(error)
            return error;
        })
    return response
}

const postMethod = async (url:string, params:any, headers:any,)=> {
    let response = await axios.post(url,params,headers)
        .then(function (response) {
            return response;
        })
        .catch(function (error){
            console.log(error)
            return error;
        })
    return response
}

export {getMethod, postMethod}