import axios from "axios";

export const getCall = () => {

}

export const postCall = async ({url,path,config,requestBody}:any) => {
    const headers:any = {
        ...config
    }
    try{
        const response = await axios.post(url,requestBody,headers);
        return response;
    }
    catch(error:any){
        throw Error(error);
    }
}