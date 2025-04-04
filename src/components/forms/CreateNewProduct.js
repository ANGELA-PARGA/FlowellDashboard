'use client'

import { createNewProduct } from '@/actions/productActions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forceLogOut } from '@/lib/forceLogout';
import styles from './components.module.css';
import { toast } from 'react-toastify';
import Image from 'next/image';

const schema = yup.object().shape({
    name: yup.string().typeError('the name must be text').required('The name is required'),
    description: yup.string().typeError('the description must be text').required('The description is required'),
    color: yup.string().typeError('the color must be text').required('The color is required'), 
    category_id: yup.number().typeError('the category must be a number').required('The category is required'),
    stem_length_cm: yup.number().typeError('the stem length must be a number').required('The stem length is required').min(20, 'The min value allowed is 20 cm').max(60, 'The max value allowed is 60 cm'),
    bloom_size_cm: yup.number().typeError('the bloom size must be a number').required('The bloom size is required').min(0.5, 'The min value allowed is 0.5 cm').max(25, 'The max value allowed is 25 cm'),
    blooms_per_stem: yup.number().typeError('the blooms per stem must be a number').required('The blooms per stem is required').min(1, 'The min value allowed is 1 bloom').max(20, 'The max value allowed is 20 blooms'), 
    life_in_days: yup.number().typeError('the life span must be a number').required('The life span is required').min(7, 'The min value allowed is 7 days').max(20, 'The max value allowed is 20 days'), 
    qty_per_case: yup.number().typeError('the qty per case must be a number').required('The qty per case is required').min(12, 'The min value allowed is 12 units').max(140, 'The max value allowed is 140 units'),  
    measure_per_case: yup.string().typeError('the measure per case must be text').required('The measure per case is required'), 
    price_per_case: yup.number().typeError('the price per case must be a number').required('The price per case is required').min(20, 'The min value allowed is 20 dollars').max(200, 'The max value allowed is 200 dollars'),
    stock_available: yup.number().typeError('the stock must be a number').min(0, 'Min 0 units').max(200, 'Max 200 units').required('The stock is required'),
    // ✅ Image validation: Max 3 images, only JPG, PNG, or WebP, max 5MB each
    images_url: yup
        .mixed()
        .test('required', 'You must upload at least 1 image', (files) => {
            return Array.isArray(files) && files.length > 0;  // ✅ Ensure files is an array
        })
        .test('fileType', 'Only .jpg, .png, or .webp formats are allowed', (files) => {
            return Array.isArray(files) && files.every(file => 
                ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)
            );
        })
        .test('fileSize', 'Each image must be less than 5MB', (files) => {
            return Array.isArray(files) && files.every(file => file.size <= 5 * 1024 * 1024);
        })
        .test('maxFiles', 'You can upload a maximum of 3 images', (files) => {
            return Array.isArray(files) && files.length <= 3;
        })

});

const CreateNewProduct = ({handleClose}) => {
    const [updateError, setupdateError] = useState();
    const [selectedImages, setSelectedImages] = useState([]);

    const { register, handleSubmit, formState: { errors, isSubmitting}, trigger, setValue} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData) => {

        await schema.validate(formData)        
        try {
            const response = await createNewProduct(formData)  // ✅ Send images & form data
            if(response.expired){
                toast.error('Your session has expired, please login again')
                await forceLogOut(handleClose)
            } else {
                handleClose()
                toast.success(`New product created succesfully`)  
            } 
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to create the new product, try again') 
        }     
    } 

     // ✅ Handle image selection & preview
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        console.log("Selected Files:", files);
    
        setSelectedImages(files.map(file => URL.createObjectURL(file)));  // ✅ Generate previews
    
        setValue('images_url', files, { shouldValidate: true, shouldDirty: true }); 
        trigger('images_url');
    };
    

    const handleOnCancel = (e) =>{
        e.preventDefault();
        handleClose();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.updates_form} encType='multipart/form-data'>          
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
                <input {...register('bloom_size_cm')} type="number" step="0.5" name="bloom_size_cm" id="bloom_size_cm" min='0.5' max='25'
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
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="stock_available">Insert the new stock quantity</label>
                    <p className={styles.error_updating_info}>{errors.stock_available?.message}</p>
                </div>
                <input {...register('stock_available')} type="number" name="stock_available" id="stock_available" min={0} max={200}
                onBlur={() => {
                    trigger('stock_available'); 
                }} />                     
            </div>
            <div className={styles.input_container}>
                <div className={styles.labels_container}>
                    <label htmlFor="images_url">Upload Images (Max 3, format jpg/png/webp, aspect-ratio 1:1)</label>
                    <p className={styles.error_updating_info}>{errors.images_url?.message}</p>
                </div>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <div className={styles.url_preview_container}>
                {selectedImages.map((image, index)=>{
                    return(
                        <Image 
                            key={index}
                            src={image}
                            width={80}
                            height={80}
                            style={{ borderRadius: '15%' }}
                            alt={'image selected using the input'} 
                        />                       
                    )
                })}
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