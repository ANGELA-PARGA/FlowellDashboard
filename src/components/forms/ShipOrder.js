'use client'

import { shipOrder } from '@/actions/orderActions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
/*import { signOut } from 'next-auth/react';*/
import styles from './components.module.css';

const schema = yup.object().shape({
    tracking: yup.string().matches(/^\d{12}$/, "Tracking must be exactly 12 digits")
    .required('The Tracking is required')
});

const ShipOrder = ({id, handleClose}) => {
    const [updateError, setupdateError] = useState(); 

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        await schema.validate(formData)       
        try {
            const response = await shipOrder(formData, id)
            if(response.expired){
                setTimeout(async () => {
                    handleClose();
                    await signOut({ callbackUrl: '/login' });
                }, 2000);
            } else {
                handleClose() 
            } 
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
        }       
    } 

    const handleOnCancel = (e) =>{
        e.preventDefault();
        handleClose();
    }
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.updates_form}>          
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="tracking">Insert the tracking number from Fedex IPD program (12 digits)</label>
                    <p className={styles.error_updating_info}>{errors.tracking?.message}</p>
                </div>
                <input {...register('tracking')} type="text" name="tracking" id="tracking" placeholder='*************' pattern="\d{12}" title="Tracking number of 12 digits"
                onBlur={() => {
                    trigger('tracking'); 
                }} />                     
            </div>
            <div className={styles.buttons_container}>
                <button type="submit" className={styles.ship_button} disabled={isSubmitting}>Ship Order</button>
                <button type='button' className={styles.cancel_update_button} onClick={(e) => handleOnCancel(e)}>Cancel</button>
            </div>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form>        
    )
}

export default ShipOrder