'use client'

import { updateProductDetails } from '@/actions/productActions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forceLogOut } from '@/lib/forceLogout';
import styles from './components.module.css';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    name: yup.string().typeError('the name must be text').required('The name is required'),
    description: yup.string().typeError('the description must be text').required('The description is required'),
    color: yup.string().typeError('the color must be text').required('The color is required'), 
    category_id: yup.number().typeError('the category must be a number').required('The category is required'), 
});

const ChangeProductInfo = ({data, handleClose}) => {
    const [updateError, setupdateError] = useState(); 

    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, dirtyFields }, trigger} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data.name,
            description: data.description,
            color: data.color,
            category: data.category,
            category_id: data.category_id
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
                toast.success(`Product information updated succesfully`) 
                handleClose() 
            } 
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to updated the product information, try again') 
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
                    <label htmlFor="name">Enter the name of the product</label>
                    <p className={styles.error_updating_info}>{errors.name?.message}</p>
                </div>
                <input {...register('name')} type="text" name="name" id="name" onBlur={() => {
                    trigger('name'); 
                }} />                
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="description">Enter the description of the product</label>
                    <p className={styles.error_updating_info}>{errors.description?.message}</p>
                </div>
                <textarea 
                    {...register('description')} onBlur={() => {
                        trigger('description'); 
                    }}
                    id="description"
                    name="description"
                    rows="10" 
                    cols="60" 
                    placeholder="Enter a detailed description..."
                />
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="color">Choose the color of the product</label>
                    <p className={styles.error_updating_info}>{errors.color?.message}</p>
                </div>
                <select {...register("color")} onBlur={() => {
                        trigger('color'); 
                    }}>
                        <option value='white'>White</option>
                        <option value='creamy white'>Creamy White</option>
                        <option value='red'>Red</option>
                        <option value='pink'>Pink</option>
                        <option value='light pink'>Light Pink</option>
                        <option value='hot pink'>Hot Pink</option>
                        <option value='lavender'>Lavender</option>
                        <option value='orange'>Orange</option>
                        <option value='yellow'>Yellow</option>
                        <option value='green'>Green</option>
                        <option value='blue'>Blue</option>
                </select>
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="category">Choose the category of the product</label>
                    <p className={styles.error_updating_info}>{errors.category?.message}</p>
                </div>
                <select {...register("category_id")} onBlur={() => {
                    trigger('category_id'); 
                }}>
                    <option value={1}>Roses</option>
                    <option value={2}>Spray Roses</option>
                    <option value={3}>Greenery</option>
                    <option value={4}>Pompons</option>
                    <option value={5}>Moms</option>
                    <option value={6}>Sunflowers</option>
                    <option value={7}>Tulips</option>
                    <option value={8}>Alstroemerias</option>
                    <option value={9}>Gerberas</option>
                    <option value={10}>Hydrangeas</option>
                </select>
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

export default ChangeProductInfo