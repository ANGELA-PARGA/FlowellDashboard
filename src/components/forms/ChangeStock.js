'use client'

import { updateStock } from '@/actions/productActions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forceLogOut } from '@/lib/forceLogout';
import styles from './components.module.css';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    stock: yup.number().typeError('the stock must be a number').min(0, 'Min 0 units').max(200, 'Max 200 units')
    .required('The stock is required')
});

const ChangeStock = ({data, handleClose}) => {
    const [updateError, setupdateError] = useState(); 

    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, dirtyFields }, trigger} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {stock: data.stock}
    });

    const onSubmit = async (formData) => {
        // ✅ If no fields were changed, prevent unnecessary update
        if (!isDirty) { 
            handleClose();           
            return;
        }

        await schema.validate(formData)       
        try {
            const response = await updateStock(formData, data.id)
            if(response.expired){
                toast.error('Your session has expired, please login again')
                await forceLogOut(handleClose)
            } else {
                toast.success(`Product stock updated succesfully`) 
                handleClose() 
            } 
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to updated the product stock, try again') 
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
                    <label htmlFor="stock">Insert the new stock quantity. If you want to block a product set the stock to 0</label>
                    <p className={styles.error_updating_info}>{errors.stock?.message}</p>
                </div>
                <input {...register('stock')} type="number" name="stock" id="stock" min={0} max={200}
                onBlur={() => {
                    trigger('stock'); 
                }} />                     
            </div>
            <div className={styles.buttons_container}>
                <button type="submit" className={styles.ship_button} disabled={isSubmitting}>Update</button>
                <button type='button' className={styles.cancel_update_button} onClick={(e) => handleOnCancel(e)}>Cancel</button>
            </div>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form>        
    )
}

export default ChangeStock