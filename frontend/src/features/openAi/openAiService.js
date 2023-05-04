import axios from 'axios'


const API_URL='/api/concepts'

export const  getConceptByOpenAiAPIRequest=async (data,token)=>{

 
        console.log("salehhatgpt",data ,token)
        const config ={
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        const response=await axios.post(`/api/concepts/get/concept/openai/api/${data.categoryId}`,data,config)
        return response.data


  

}




const openAiService={
    getConceptByOpenAiAPIRequest
   
    
}

export default openAiService