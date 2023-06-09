import { Stepper,Step,ConnectorStyleProps } from 'react-form-stepper';
import {MdAlternateEmail} from 'react-icons/md'
import {GrValidate} from 'react-icons/gr'
import {RiLockPasswordLine} from 'react-icons/ri'
import {TbListDetails} from 'react-icons/tb'
import { useTranslation } from "react-i18next"
function RegisterStepper({activeStep}){
    const {t,i18n}=useTranslation()
    const defaultStepStyle = {
        activeBgColor: '#fa976c', // set the default size for steps
        completedBgColor: '#11e980',
        inactiveTextColor:'#000000',
        completedTextColor:'#000000',
        activeTextColor:'#000000',

      };

    return(<>
        <div dir='ltr'>
        <Stepper activeStep={activeStep}  styleConfig={defaultStepStyle}>
            <Step circleFontSize='2rem' label={t('e-mail')}  ><MdAlternateEmail/></Step>
            <Step label={t('validation')} ><GrValidate/></Step>
            <Step label={t('password')} ><RiLockPasswordLine/></Step>
            <Step label={t('details')} ><TbListDetails/></Step>
        </Stepper>
        </div>
    </>)
}
export default RegisterStepper