import axios from 'axios'

const API_URL='/api/concepts'

//get single concept by  search text
const getConcept =async (data)=>{
    const response=await axios.post(API_URL+`/get/concept/${data.categoryId}`,data)
    return response.data
}

//get all concepts names 
const getConceptsNames =async ()=>{
    const response=await axios.get(API_URL+'/get/names') 
    
    return response.data
}

//get concepts the close to textSearch 
const getConcepts =async (data)=>{
    const response=await axios.get(API_URL+`/get/concepts/${data.data}`) 
    
    return response.data
}

//create new concept by user
const createNewConceptByUser =async (data,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+"/create/concept",data,config) 
    
    return response.data
}

//get unAccepted concepts for admin editing
const getUnAcceptedConcepts =async (token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(API_URL+"/get/concepts/not/accepted",config) 
    
    return response.data
}



const conceptService={
    getConcept,
    getConceptsNames,
    getConcepts,createNewConceptByUser,
    getUnAcceptedConcepts
    
}

export default conceptService