'use client'

/*import { updateOrderShippingInfo } from '@/actions/ordersRequest';*/
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
/*import { signOut } from 'next-auth/react';*/
import styles from './components.module.css';

const schema = yup.object().shape({
    contact_phone: yup.string().required('The phone is required and must be valid')
        .transform((value) => {
            const cleaned = ('' + value).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3];
            }
            return value;
        }).matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'The phone number must be valid'),
    address: yup.string().required('The address is required'),
    city: yup.string().required('The city is required'),
    state: yup.string().required('The state is required'),
    zip_code: yup.string().required('The zip code is required').test('valid_zip_code','The zip code must be valid', (value) => {
        return /^[0-9]{5}$/.test(value); 
    } ),  
});

const ChangeShippingInfo = ({data, handleClose}) => {
    const [updateError, setupdateError] = useState(); 

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger, setValue} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        await schema.validate(formData)
        const shipping_info = {
            ...formData,
        }        
        try {
            const response = await updateOrderShippingInfo(shipping_info, data.id)
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
    
    const handlePhoneChange = (e) => {
        const cleaned = ('' + e.target.value).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            const formattedPhone = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            setValue('contact_phone', formattedPhone, { shouldValidate: true });
        } else {
            setValue('contact_phone', e.target.value, { shouldValidate: true });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.updates_form}>          
                <div className={styles.input_container}>
                    <div className={styles.labels_container}>
                        <label htmlFor="address">Enter your address</label>
                        <p className={styles.error_updating_info}>{errors.address?.message}</p>
                    </div>
                    <input {...register('address')} type="text" name="address" id="address" defaultValue={data.shipping_info.address} onBlur={() => {
                        trigger('address'); 
                    }} />                    
                </div>
                <div className={styles.input_container}>
                    <div className={styles.labels_container}>
                        <label htmlFor="city">Enter the city</label>
                        <p className={styles.error_updating_info}>{errors.city?.message}</p>
                    </div>
                    <input {...register('city')} type="text" name="city" id="city" defaultValue={data.shipping_info.city} onBlur={() => {
                        trigger('city');
                    }} />
                </div>
                <div className={styles.input_container}>
                    <div className={styles.labels_container}>
                        <label htmlFor="state">Enter the state</label>
                        <p className={styles.error_updating_info}>{errors.state?.message}</p>
                    </div>
                    <input {...register('state')} type="text" name="state" id="state" defaultValue={data.shipping_info.state} onBlur={() => {
                        trigger('state'); 
                    }} />
                </div>
                <div className={styles.input_container}>
                    <div className={styles.labels_container}>
                        <label htmlFor="zip_code">Enter a valid zip code</label>
                        <p className={styles.error_updating_info}>{errors.zip_code?.message}</p>
                    </div>
                    <input {...register('zip_code')} type="text" name="zip_code" id="zip_code" defaultValue={data.shipping_info.zip_code} onBlur={() => {
                        trigger('zip_code'); 
                    }} />
                </div>
                <div className={styles.input_container}>
                    <div className={styles.labels_container}>
                        <label htmlFor="contact_phone">Enter phone number</label>
                        <p className={styles.error_updating_info}>{errors.contact_phone?.message}</p>
                    </div>
                    <input {...register('contact_phone')} type="text" name="contact_phone" id="contact_phone" defaultValue={data.shipping_info.phone} onBlur={() => {
                        trigger('contact_phone'); 
                    }} onChange={handlePhoneChange}/>
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

export default ChangeShippingInfo
