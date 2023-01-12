import axios from 'axios'


const API_URL='/api/users'

//upload image to s3
const uploadImage =async (formdata)=>{
    console.log(formdata)
    const response=await axios.post(API_URL+'/upload/image',formdata)
    if(response.data){
        localStorage.setItem('image',JSON.stringify(response.data))
    }
    return response.data
}
//upload image to s3 and store it URL in hte database
const updateUserImage =async (formdata,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'/update/image',formdata,config)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//register user
const register =async (Data)=>{
    const response=await axios.post(API_URL+`/register/${Data.categoryId}`,Data.formData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//login user
const login =async (userData)=>{
    const response=await axios.post(API_URL+'/login',userData)
    
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//Logout user
const logout=()=>localStorage.removeItem('user')

//reset password
const resetPassword =async (formData,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'/reset/password',formData ,config)
    
    return response.data
}
//update user
const updateUser =async (formData,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'/update/user',formData ,config)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
//verify user
const verifyUser =async (data,token)=>{

    const response=await axios.post(API_URL+'/verify',data)

    return response.data
}


//update the cuser coins after the game play
const setCoins =async (data,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'/set/coins',data ,config)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
const authService={
    register,
    logout,
    login,
    resetPassword,
    uploadImage,
    updateUser,
    updateUserImage,
    verifyUser,
    setCoins
    
}

export default authService