'use client'

import { createNewProduct } from '@/actions/productActions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
/*import { signOut } from 'next-auth/react';*/
import styles from './components.module.css';

const schema = yup.object().shape({
    name: yup.string().typeError('the name must be text').required('The name is required'),
    description: yup.string().typeError('the description must be text').required('The description is required'),
    color: yup.string().typeError('the color must be text').required('The color is required'), 
    category_id: yup.number().typeError('the category must be a number').required('The category is required'),
    stem_length_cm: yup.number().typeError('the stem length must be a number').required('The stem length is required').min(20, 'The min value allowed is 20 cm').max(60, 'The max value allowed is 60 cm'),
    bloom_size_cm: yup.number().typeError('the bloom size must be a number').required('The bloom size is required').min(0.5, 'The min value allowed is 0.5 cm').max(15, 'The max value allowed is 15 cm'),
    blooms_per_stem: yup.number().typeError('the blooms per stem must be a number').required('The blooms per stem is required').min(1, 'The min value allowed is 1 bloom').max(20, 'The max value allowed is 20 blooms'), 
    life_in_days: yup.number().typeError('the life span must be a number').required('The life span is required').min(7, 'The min value allowed is 7 days').max(20, 'The max value allowed is 20 days'), 
    qty_per_case: yup.number().typeError('the qty per case must be a number').required('The qty per case is required').min(12, 'The min value allowed is 12 units').max(140, 'The max value allowed is 140 units'),  
    measure_per_case: yup.string().typeError('the measure per case must be text').required('The measure per case is required'), 
    price_per_case: yup.number().typeError('the price per case must be a number').required('The price per case is required').min(20, 'The min value allowed is 20 dollars').max(200, 'The max value allowed is 200 dollars'),  
});

const CreateNewProduct = ({handleClose}) => {
    const [updateError, setupdateError] = useState(); 

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData) => {
        console.log(formData)
        await schema.validate(formData)        
        try {
            const response = await createNewProduct(formData)
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
                <select {...register("color")}  onBlur={() => {
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

export default CreateNewProduct