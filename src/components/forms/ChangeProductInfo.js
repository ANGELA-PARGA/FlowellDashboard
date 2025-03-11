'use client'

/*import { updateOrderShippingInfo } from '@/actions/ordersRequest';*/
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
/*import { signOut } from 'next-auth/react';*/
import styles from './components.module.css';

const schema = yup.object().shape({
    name: yup.string().typeError('the name must be text').required('The name is required'),
    description: yup.string().typeError('the description must be text').required('The city is required').required('The description is required'),
    color: yup.string().typeError('the color must be text').required('The color is required'), 
    category: yup.string().typeError('the category must be text').required('The category is required'), 
});

const ChangeProductInfo = ({data, handleClose}) => {
    const [updateError, setupdateError] = useState(); 

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        await schema.validate(formData)
        console.log(formData)
        const updated_product_info = {
            ...formData,
        }        
        try {
            const response = await updateOrderShippingInfo(updated_product_info, data.id)
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
                    <label htmlFor="name">Enter the name of the product</label>
                    <p className={styles.error_updating_info}>{errors.name?.message}</p>
                </div>
                <input {...register('name')} type="text" name="name" id="name" defaultValue={data.name} onBlur={() => {
                    trigger('name'); 
                }} />                
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="description">Enter the description of the product</label>
                    <p className={styles.error_updating_info}>{errors.description?.message}</p>
                </div>
                <textarea 
                    {...register('description')} 
                    defaultValue={data.description} 
                    onBlur={() => {
                        trigger('description'); 
                    }}
                    id="description"
                    name="description"
                    rows="10" // Controls height
                    cols="60" // Optional: Controls width
                    placeholder="Enter a detailed description..."
                />
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="color">Choose the color of the product</label>
                    <p className={styles.error_updating_info}>{errors.color?.message}</p>
                </div>
                <select {...register("color")} defaultValue={data.color} onBlur={() => {
                        trigger('color'); 
                    }}>
                        <option value='white'>White</option>
                        <option value='creamy white'>Creamy White</option>
                        <option value='red'>Red</option>
                        <option value='pink'>Pink</option>
                        <option value='light pink'>Light Pink</option>
                        <option value='lavender'>Lavender</option>
                        <option value='orange'>Orange</option>
                        <option value='yellow'>Yellow</option>
                        <option value='green'>Green</option>
                </select>
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="category">Choose the category of the product</label>
                    <p className={styles.error_updating_info}>{errors.category?.message}</p>
                </div>
                <select {...register("category")} defaultValue={data.category} onBlur={() => {
                    trigger('category'); 
                }}>
                    <option value='roses'>Roses</option>
                    <option value='spray roses'>Spray Roses</option>
                    <option value='greenery'>Greenery</option>
                    <option value='hydrangeas'>Hydrangeas</option>
                    <option value='gerberas'>Gerberas</option>
                    <option value='sunflowers'>Sunflowers</option>
                    <option value='carnations'>Carnations</option>
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