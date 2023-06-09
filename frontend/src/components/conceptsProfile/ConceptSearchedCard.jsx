import {Link} from 'react-router-dom'
import {getCategoryNameById,getConceptNameCookies} from '../../hooks/ExportsFunctions'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {useEffect} from 'react'
import cookies from "js-cookie"
// import getUserConceptsAdded from '../features/conceptsProfile/conceptProfileSlice'

function ConceptSearchedCard({concept}){
    const {t}=useTranslation()
const {categories}=useSelector(state=>state.category)
const dateObj = new Date(concept.createdAt);
    return(<>
    <div class={cookies.get('i18next')=='en'?'card w-100 text-start':'card w-100 text-end'} >
  <div class="card-body">
    <h5 class="card-title">{getConceptNameCookies(concept.concept)}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">{getCategoryNameById(categories,concept.concept.categories[0])}</h6>
    <div className='row' dir='rtl'>
    <Link className='col-4' to={`/search/${concept.concept.conceptName.english}/${concept.concept.categories[0]}`}>{t('search_for')}</Link>
    <p className='col-8'>{concept.createdAt?`${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}-${dateObj.getHours()}:${dateObj.getMinutes()}`:t('no_date_defined')}</p>
    </div>
  </div>
</div>
    </>)
}
export default ConceptSearchedCard