import {Link,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import {logout} from '../features/auth/authSlice';
import { useTranslation } from "react-i18next";
import cookies from 'js-cookie';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {MdLanguage} from 'react-icons/md';
import {ImExit,ImUserPlus, ImProfile} from 'react-icons/im';
import {GoSignIn} from 'react-icons/go';
import {BsTranslate} from 'react-icons/bs'
import "../styles/Header.css";
import LogoutModal from './LogoutModal';
import {sendLanguageChange} from '../features/logging/appLanguageChangeSlice'



function Header(){
    const {t,i18n}=useTranslation();
    const {user}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [show,toggleShow]=useState(false)
    
    const [active, setActive] = useState(false);
    const optionsClick = () => {
        setActive(!active);
    };
   
    useEffect(()=>{
    if(cookies.get('i18next')==='en'){
        document.body.dir='ltr';
    }else{
        document.body.dir='rtl';
    }
    },[])
    const onLogin=()=>{
        navigate('/login')
        optionsClick()
    }
    const onRegister=()=>{
        navigate('/register')
        optionsClick()

    }
    const onLogout=(e)=>{
        e.preventDefault()
        dispatch(logout())
        navigate('/')

    }
    const onProfile = () => {
        navigate('/profile')
        optionsClick()
    }
      const languagechange=(change)=>{
        const data={
          newLanguage:change
        }
        dispatch(sendLanguageChange(data))
    }
    const onLanguageChange=(e)=>{
        e.preventDefault()
        languagechange(e.target.name)
        // from here we need to send that the language changed

        i18n.changeLanguage(e.target.name)
        console.log(e.target.name)
        if(cookies.get('i18next')==='en'){
            document.body.dir='ltr';
        }
        else{
            document.body.dir='rtl';

        }
        optionsClick();
        
       
    }
    return (
        
        <>
        
        <LogoutModal show={show} toggleShow={toggleShow}/>
        <div dir='ltr' className="nav1">
        <div className="space"></div>
            <div className="content">
                <div className="text">
                    <Link to='/' id='titlestyle' className="navbar-brand text-secondary mx-3"> <BsTranslate className='text-light display-1' size="60" /></Link>
                </div>
                <div className={`btnb ${active ? 'active' : ''}`} onClick={optionsClick}><span></span></div>

            </div>
            <div className={`box ${active ? 'open' : ''}`}>
                <i className="lan">
                    <div className="dropdown dropleft">
                        <button className="lan" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <MdLanguage />
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="l-option">
                            <a className="dropdown-item" name='en' onClick={onLanguageChange}><span className="fi fi-us"></span> English</a>
                            <a className="dropdown-item" name='hb' onClick={onLanguageChange}><span className="fi fi-il"></span> עברית</a>
                            <a className="dropdown-item" name='ar' onClick={onLanguageChange}><span className="fi fi-sa"></span> العربية</a>
                        </div>
                    </div>
                </i>
                {!user?(
                    <>
                    <i className="log"><button onClick={onLogin} type="button"><GoSignIn/></button></i>
                    <i className="plus"><button onClick={onRegister} type="button"><ImUserPlus/></button></i>
                    </>
                ):(
                    <>
                    <i className="exit"><button onClick={()=>toggleShow(!show)} type="button"><ImExit/></button></i>

                    <i className="prof " onClick={onProfile}><img src={user.profile_image}/></i>
                    </>
                )}
            </div>
        </div>
        

        
       
        </>
    )
}


export default Header