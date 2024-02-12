import { motion } from 'framer-motion'
import Swords from '../../assets/another/swords.svg'
import ProductsCatalog from '../../components/ProductsCatalog/ProductsCatalog';
import './MainPage.scss'


const MainPage = () => {
    return (
        <motion.div 
            className="main-page"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="container">
                <div className="main-page__title">
                    <div className="title">Каталог товаров</div>
                    <div className="title-img">
                        <img src={Swords} alt="img" />
                    </div>
                </div>
                <ProductsCatalog />
            </div>
        </motion.div>
    )
}

export default MainPage;