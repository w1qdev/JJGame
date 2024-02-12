import { Spinner } from '@chakra-ui/react'
import './LoadSpinner.scss'


const LoadSpinner = (props) => {
    return (
        <div className="spinner-container">
            <Spinner {...props} />
        </div>
    )
} 

export default LoadSpinner;