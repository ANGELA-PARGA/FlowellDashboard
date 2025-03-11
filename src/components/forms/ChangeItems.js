'use client'

/*import { updateOrderItemsInfo } from '@/actions/ordersRequest';*/
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
/*import { signOut } from 'next-auth/react';*/
import styles from './components.module.css';

const schema = yup.object().shape({
    quantity: yup.number().typeError("Quantity must be a number").required('The quantity is required').min(0, "Quantity must be 0 or more").max(20, 'Quantity must be less than 20'), 
});

const ChangeItemsInfo = ({data, handleClose}) => {
    const [updateError, setupdateError] = useState(); 

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        await schema.validate(formData)
        const new_quantities = {
            ...formData,
        }        
        try {
            const response = await updateOrderItemsInfo(new_quantities, data.id)
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.updates_form}>          
                <div className={styles.input_container}>
                    <div className={styles.labels_container}>
                        <label htmlFor="quantity">{data.item.name}</label>
                        <p className={styles.error_updating_info}>{errors.quantity?.message}</p>
                    </div>
                    <input {...register('quantity')} type="number" name="quantity" id="quantity" defaultValue={data.item.qty} min="0" max="20"
                    onBlur={() => {
                        trigger('quantity'); 
                    }} />                     
                </div>
                <div className={styles.buttons_container}>
                    <button type="submit" className={styles.update_button} disabled={isSubmitting}>Update</button>
                    <button type='button' className={styles.cancel_update_button} onClick={(e) => handleOnCancel(e)}>Cancel</button>
                </div>
                <div>
                    <p className={styles.error_updating_info}>{updateError}</p>
                </div>
            </form>    
        </div>        
    )
}

export default ChangeItemsInfo