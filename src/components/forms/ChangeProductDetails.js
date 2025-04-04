'use client'

import { updateProductDetails } from '@/actions/productActions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from './components.module.css';
import { forceLogOut } from '@/lib/forceLogout';
import { toast } from 'react-toastify';


const schema = yup.object().shape({
    stem_length_cm: yup.number().typeError('the stem length must be a number').required('The stem length is required').min(20, 'The min value allowed is 20 cm').max(60, 'The max value allowed is 60 cm'),
    bloom_size_cm: yup.number().typeError('the bloom size must be a number').required('The bloom size is required').min(0.5, 'The min value allowed is 0.5 cm').max(15, 'The max value allowed is 15 cm'),
    blooms_per_stem: yup.number().typeError('the blooms per stem must be a number').required('The blooms per stem is required').min(1, 'The min value allowed is 1 bloom').max(20, 'The max value allowed is 20 blooms'), 
    life_in_days: yup.number().typeError('the life span must be a number').required('The life span is required').min(7, 'The min value allowed is 7 days').max(20, 'The max value allowed is 20 days'), 
    qty_per_case: yup.number().typeError('the qty per case must be a number').required('The qty per case is required').min(12, 'The min value allowed is 12 units').max(140, 'The max value allowed is 140 units'),  
    measure_per_case: yup.string().typeError('the measure per case must be text').required('The measure per case is required'), 
    price_per_case: yup.number().typeError('the price per case must be a number').required('The price per case is required').min(20, 'The min value allowed is 20 dollars').max(200, 'The max value allowed is 200 dollars'), 
});

const ChangeProductDetails = ({data, handleClose}) => {
    const [updateError, setupdateError] = useState(); 

    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, dirtyFields }, trigger, setValue} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            stem_length_cm: data.stem_length_cm,
            bloom_size_cm: data.bloom_size_cm,
            blooms_per_stem: data.blooms_per_stem,
            life_in_days: data.life_in_days,
            qty_per_case: data.qty_per_case,
            measure_per_case:data.measure_per_case,
            price_per_case: data.price_per_case
        }
    });

    const onSubmit = async (formData) => {
        const updatedData = Object.keys(dirtyFields).reduce((acc, key) =>{
            acc[key] = formData[key]
            return acc            
        }, {})

        // ✅ If no fields were changed, prevent unnecessary update
        if (!isDirty) { 
            handleClose();           
            return;
        }

        await schema.validate(formData)      
        try {
            const response = await updateProductDetails(updatedData, data.id)
            if(response.expired){
                toast.error('Your session has expired, please login again')
                await forceLogOut(handleClose)
            } else {
                toast.success(`Product details updated succesfully`) 
                handleClose() 
            } 
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to updated the product details, try again') 
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
                    <label htmlFor="stem_length_cm">Enter the stem length (cm) of the product</label>
                    <p className={styles.error_updating_info}>{errors.stem_length_cm?.message}</p>
                </div>                
                <select {...register("stem_length_cm")} onBlur={() => {
                    trigger('stem_length_cm'); 
                }}>
                    {Array.from({ length: 9 }, (_, index) => 20 + index * 5).map(value => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>                       
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="bloom_size_cm">Enter the bloom size (cm) of the product</label>
                    <p className={styles.error_updating_info}>{errors.bloom_size_cm?.message}</p>
                </div> 
                <input {...register('bloom_size_cm')} type="number" step="0.5" name="bloom_size_cm" id="bloom_size_cm" min='0.5' max='15'
                onBlur={() => {
                    trigger('bloom_size_cm'); 
                }} />                               
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="blooms_per_stem">Enter the blooms per stem of the product</label>
                    <p className={styles.error_updating_info}>{errors.blooms_per_stem?.message}</p>
                </div>
                <input {...register('blooms_per_stem')} type="number" name="blooms_per_stem" id="blooms_per_stem" min='1' max='20'
                onBlur={() => {
                    trigger('blooms_per_stem'); 
                }} />                
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="life_in_days">Enter the life in days of the product</label>
                    <p className={styles.error_updating_info}>{errors.life_in_days?.message}</p>
                </div>
                <input {...register('life_in_days')} type="number" name="life_in_days" id="life_in_days" min='7' max='20'
                onBlur={() => {
                    trigger('life_in_days'); 
                }} />                
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="qty_per_case">Enter the qty per case of the product</label>
                    <p className={styles.error_updating_info}>{errors.qty_per_case?.message}</p>
                </div>
                <input {...register('qty_per_case')} type="number" name="qty_per_case" id="qty_per_case" min="12" max="140"
                onBlur={() => {
                    trigger('qty_per_case'); 
                }} />                
            </div> 
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="measure_per_case">Enter the measure per case of the product</label>
                    <p className={styles.error_updating_info}>{errors.stem_length_cm?.message}</p>
                </div>
                <select {...register("measure_per_case")} onBlur={() => {
                    trigger('measure_per_case'); 
                }}>
                    <option value='stems'>Stems</option>
                    <option value='bunches'>Bunches</option>
                    <option value='dozens'>Dozen</option>
                </select>               
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="price_per_case">Enter the price per case of the product</label>
                    <p className={styles.error_updating_info}>{errors.price_per_case?.message}</p>
                </div>
                <input {...register('price_per_case')} type="number" step="0.01" name="price_per_case" id="price_per_case" min="20" max="200"
                onBlur={() => {
                    trigger('price_per_case'); 
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
    )
}

export default ChangeProductDetails