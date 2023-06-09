import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {CgPassword} from 'react-icons/cg';
import {useDispatch,useSelector} from 'react-redux';
import {resetPassword ,reset} from '../../features/auth/authSlice';
import {toast} from 'react-toastify';
import Spinner from '../../components/Spinner';
import { useTranslation } from 'react-i18next';
function ResetPassword(){
    const navigate=useNavigate();
    const {t}=useTranslation();
    const {user}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const {isError,isSuccess,message,isLoading}=useSelector(state=>state.auth);
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success('Successfuly reset password')
            navigate('/profile')
        }
        dispatch(reset())
    },[isError,isSuccess,message])
    const [formData,setFormData]=useState({
        password:'',
        password1:'',
        password2:'',
    })
    const {password,password1,password2}=formData
    const onChange=(e)=>{
        setFormData((prevState)=>{
            return ({
                ...prevState,
                [e.target.name]:e.target.value

            })
        })
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(resetPassword(formData))
    }
    if(isLoading){
        return <Spinner/>
    }
    return(<> 
        <div className="  text-center mt-150 pt-5 ">
            <label className="text-secondary mb-5" style={{"fontSize":"250%"}}>
                 <h1  className='text-warning'>
                 Reset 
                 <span className='text-secondary'>Password </span>
                 <CgPassword className='text-secondary' style={{"fontSize":"150%"}}/>
                 </h1>
             </label>

             <form onSubmit={onSubmit}>
             <div className='container  text-center '>
      
            <div className="form-floating  mb-3 ">
                <input
                className="form-control "
                name='password1'
                type='password'
                placeholder={t('new password')}
                id='password1'
                value={password1}
                onChange={onChange}
                required

                 />
                  <label for="floatingInput">{t('new password')}</label>
            </div>
            <div className="form-floating  mb-3 ">
                <input
                className="form-control "
                name='password2'
                type='password'
                placeholder={t('confirm password')}
                id='password2'
                value={password2}
                onChange={onChange}
                required

                 />
                  <label for="floatingInput">{t('confirm password')}</label>
            </div>

            <button className='btn btn-online-secondary mt-3'>{t('reset')}</button>
            </div>
             </form>
            
        </div>

       

    </>)
}
export default ResetPassword