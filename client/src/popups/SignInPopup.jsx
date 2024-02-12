import { motion } from 'framer-motion'
import './Popup.scss'
import { useState } from 'react'
import { isDataFilled } from '../utils/isDataFilled'
import { toastError, toastSuccess } from '../utils/toasts'
import { endpoints } from '../api'
import LoadSpinner from '../components/LoadSpinner/LoadSpinner'
import passwordValidator from '../utils/passwordValidator'
import axios from 'axios'


const SignInPopup = () => {

    const [isFetching, setIsFetching] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const changeFormData = ({ name, value }) => setFormData({...formData, [name]: value })

    const submit = async (e) => {
        e.preventDefault()

        if (!passwordValidator(formData.password)) {
            toastError("Длина пароля меньше 8 символов")
            return
        }

        if (isDataFilled(formData)) {
            toastError("Кажется, вы что-то не заполнили")
            return
        }

        setIsFetching(prev => !prev)
        await axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.USERS.ROUTE}${endpoints.USERS.SIGNIN}`, formData)
        .then(res => {
            if (res.data.error) {
                toastError(res.data.error)
                return
            }

            if (res.data?.fullName && res.data?.email) {
                localStorage.setItem('name', res.data.fullName)
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('uid', res.data.uid)

                window.location = '/'
            } else {
                toastError("Что-то пошло не так, попробуйте позже")
            }
        })
        .catch(err => {
            toastError("Что-то пошло не так, попробуйте позже")
        })

        setIsFetching(prev => !prev)
    }

    return (
        <form className="form" onSubmit={submit}>
            <div className="form__item">
                <div className="form__item-title">Введите ваш email</div>
                <input 
                    type="text" 
                    placeholder='example@gmail.com'
                    name='email'
                    value={formData.email}
                    onChange={e => changeFormData(e.target)} 
                />
            </div>
            <div className="form__item">
                <div className="form__item-title">Введите пароль</div>
                <input 
                    type="password" 
                    placeholder='password123@_'
                    name='password'
                    value={formData.password}
                    onChange={e => changeFormData(e.target)} 
                />
            </div>
            <motion.button 
                type='submit'
                whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.99 }}    
            >
                { isFetching ? (
                    <LoadSpinner color="#ffffff" size='md' />
                ) : 
                    ("Войти") }
            </motion.button>  
        </form>
    )
}

export default SignInPopup;