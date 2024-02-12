import SignInPopup from './SignInPopup'
import SignUpPopup from './SignUpPopup'
import CloseIcon from '../assets/popup/close.svg'
import { motion } from 'framer-motion'
import './Popup.scss'


const PopupContent = ({ contentName }) => {
    const contentNames = {
        'sign-in': <SignInPopup />,
        'sign-up': <SignUpPopup />
    }
    
    return contentNames[contentName]
}


const Popup = ({ title, contentName, popupHandler }) => {


    return (
        <motion.div 
            className="popup"
            onClick={() => popupHandler(prev => !prev)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: 0.2 }}
        >
            <motion.div 
                className="popup__container"
                onClick={e => e.stopPropagation()}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 , transition: 0.3}}
                exit={{ scale: 0.95, opacity: 0, transition: 0.2 }}
                transition={{ duration: 0.4 }}
            >

                <div className="popup__container__head">
                    <div className="head__title">{title}</div>
                    <div className="head__close" onClick={() => popupHandler(prev => !prev)}>
                        <img src={CloseIcon} alt="close" />
                    </div>
                </div>

                <div className="popup__container__body">

                    <PopupContent contentName={contentName} />
                </div>  
            </motion.div>
        </motion.div>
    )
}

export default Popup