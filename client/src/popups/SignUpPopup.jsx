import { motion } from 'framer-motion'
import axios from 'axios'
import './Popup.scss'
import { endpoints } from '../api'
import { useState } from 'react'
import { toastError, toastSuccess } from '../utils/toasts'
import { isDataFilled } from '../utils/isDataFilled'
import passwordValidator from '../utils/passwordValidator'
import LoadSpinner from '../components/LoadSpinner/LoadSpinner'


const SignUpPopup = () => {

    const [isFetching, setIsFetching] = useState(false) 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        secondPassword: ''
    })

    const changeFormData = ({ name, value }) => setFormData({...formData, [name]: value })

    const submit = async (e) => {
        e.preventDefault()
        
        if (!passwordValidator(formData.password)) {
            toastError("Длина пароля меньше 8 символов")
            return
        }

        if (formData.password !== formData.secondPassword) {
            toastError("Введенные пароли не совпадают")
            return
        } 

        if (isDataFilled(formData)) {
            toastError("Кажется, вы что-то не заполнили")
            return
        }

        setIsFetching(prev => !prev)
        await axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.USERS.ROUTE}${endpoints.USERS.CREATE}`, formData)
        .then(res => {
            if (res.data.error) {
                toastError(res.data.error)
                return
            }

            toastSuccess("Вы успешно зарегистрированны")
            
            if (res.data.uid) {
                localStorage.setItem("name", formData.name)
                localStorage.setItem("email", formData.email)
                localStorage.setItem("uid", res.data.uid)

                setTimeout(() => {
                    window.location = '/'
                }, 2000)
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
                <div className="form__item-title">Введите ваше имя</div>
                <input 
                    type="text" 
                    placeholder='Иван'
                    name='name'
                    value={formData.name}
                    onChange={e => changeFormData(e.target)} 
                />
            </div>
            <div className="form__item">
                <div className="form__item-title">Введите ваш email</div>
                <input 
                    type="mail" 
                    placeholder='example@gmail.com'
                    name='email'
                    value={formData.email} 
                    onChange={e => changeFormData(e.target)}
                />
            </div>
            <div className="form__item">
                <div className="form__item-title">Придумайте пароль</div>
                <input 
                    type="password" 
                    placeholder='password123!_' 
                    name='password'
                    value={formData.password}
                    onChange={e => changeFormData(e.target)}
                />
            </div>
            <div className="form__item">
                <div className="form__item-title">Введите пароль еще раз</div>
                <input 
                    type="password" 
                    placeholder='password123!_'
                    name='secondPassword'
                    value={formData.secondPassword}
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
                className='green'
            >
                { isFetching ? (
                    <LoadSpinner color="#ffffff" size='md' />
                ) : 
                    ("Зарегистрироваться") }
            </motion.button>     
        </form>
    )
}


export default SignUpPopup;
