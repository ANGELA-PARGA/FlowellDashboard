'use client'

import { updateOrderedItems } from '@/actions/orderActions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forceLogOut } from '@/lib/forceLogout';
import styles from './components.module.css';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    qty: yup.number().typeError("qty must be a number").required('The qty is required').min(0, "qty must be 0 or more").max(20, 'qty must be less than 20'), 
});

const ChangeItemsInfo = ({data, handleClose}) => {
    const [updateError, setupdateError] = useState(); 

    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty }, trigger} = useForm({
        defaultValues: { qty: data.item.qty },
        resolver: yupResolver(schema)        
    });

    const onSubmit = async (formData) => {

        // ✅ If no fields were changed, prevent unnecessary update
        if (!isDirty) { 
            handleClose();           
            return;
        }

        await schema.validate(formData) 

        const new_quantities = {
            ...formData,
            product_id: data.item.product_id
        }   

        try {
            const response = await updateOrderedItems(new_quantities, data.id)
            if(response.expired){
                toast.error('Your session has expired, please login again')
                await forceLogOut(handleClose)
            } else {
                toast.success(`Ordered items updated succesfully`)
                handleClose() 
            } 
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to updated the items quantities, try again') 
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
                        <label htmlFor="qty">{data.item.name}</label>
                        <p className={styles.error_updating_info}>{errors.qty?.message}</p>
                    </div>
                    <input {...register('qty')} type="number" name="qty" id="qty" min="0" max="20"
                    onBlur={() => {
                        trigger('qty'); 
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