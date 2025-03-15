'use client'

import { cancelOrder } from '@/actions/orderActions'
import styles from './components.module.css'


const ButtonCancelOrder = ({id, handleClose}) => {

    const handleOnClick = async (e) =>{
        e.preventDefault();
        try {
            await cancelOrder(id);
            handleClose()         
        } catch (error) {
            console.log(error)
            handleClose()
        }        
    }

    return (
        <button className={styles.cancel_button} type='button' onClick={(e) => handleOnClick(e)}>Cancel Order</button>
    )
}

export default ButtonCancelOrder