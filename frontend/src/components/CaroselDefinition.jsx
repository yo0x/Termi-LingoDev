import React, { useState, useEffect,useRef } from 'react';
import {MdOutlineAddAPhoto} from 'react-icons/md'
import $ from 'jquery'
import '../styles/TestComponent.css'
import Definitions from '../components/Definitions'
import {CgScrollH} from 'react-icons/cg'
import "/node_modules/flag-icons/css/flag-icons.min.css";

import {useSelector} from 'react-redux'
function CatouselDefinition(){
    const {concept}= useSelector(state=>state.concept)
    const [languageChoosed,setLanguageChoosed]=useState({
      english:true,
      hebrew:false,
      arabic:false,
  })
    return(<>

<div className='  text-center'>
    <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
    <div className='carousel-item-inside'>
        {/* english */}
        
        <img className='mt-3 ' src={require('../flags/united-states-xs.gif')}/>
        <br/>                

        <Definitions languageChoosed={languageChoosed} concept={concept}/>
      </div>     
    </div>
    <div className="carousel-item">
      <div className='carousel-item-inside'>
        {/* hebrew */}
        <img className='mt-3' src={require('../flags/israel-xs.gif')}/>

        {/* <span id="home-flages3" className="fi fi-il mt-3"></span>                 */}
        <br/>    
        <Definitions languageChoosed={{english:false,hebrew:true,arabic:false,}} concept={concept}/>

      </div>      
    </div>
    <div className="carousel-item">
      <div className='carousel-item-inside'>
      {/* arabic */}
         
      <img className='mt-3' src={require('../flags/saudi-arabia-xs.gif')}/>            
      <br/>                
      <Definitions languageChoosed={{english:false,hebrew:false,arabic:true,}} concept={concept}/>

      </div>     
    </div>
  </div>
  <button className="carousel-control-prev text-dark " aria-hidden="true" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next text-dark " aria-hidden="true" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span aria-hidden="true" className="visually-hidden">Next</span>
  </button>
</div>



</div>
    </>)
}
export default CatouselDefinition