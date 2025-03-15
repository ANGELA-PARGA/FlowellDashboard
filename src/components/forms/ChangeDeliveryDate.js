'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { addDays, addBusinessDays, getDay} from 'date-fns';
import { updateOrderDeliverydateInfo } from '@/actions/orderActions';
/*import { signOut } from 'next-auth/react';*/
import styles from './components.module.css';

const schema = yup.object().shape({   
    delivery_date: yup.date().required('Please select a delivery date').nullable(),
});

const ChangeDeliveryDate = ({id, handleClose}) => {
    const [updateError, setupdateError] = useState();
    const { handleSubmit, formState: { errors, isSubmitting }, setValue, watch} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        await schema.validate(formData)

        try {
            const response = await updateOrderDeliverydateInfo(formData, id);
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
    
    const handleDateChange = (date) => {
        setValue('delivery_date', date, { shouldValidate: true }); 
    };

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6 && day !== 1;
    };

    return (
        <form className={styles.updates_form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.datePicker_container}>
                <h4>Select Shipping Date</h4>
                <ReactDatePicker
                    showIcon
                    closeOnScroll={true}
                    selected={watch('delivery_date')}
                    onChange={handleDateChange}
                    minDate={addBusinessDays(new Date(), 10)}
                    maxDate={addDays(new Date(), 90)}
                    filterDate={isWeekday}
                    dateFormat="MM-dd-yyyy"
                    className={styles.customDatePicker}
                    placeholderText="Select a date"
                >
                    <p className={styles.error_updating_info}>We recommend select the delivery day 3 days before the event</p> 
                </ReactDatePicker>
                {errors.delivery_date && <p className={styles.error_updating_info}>{errors.delivery_date.message}</p>}
            </div>  
            <div className={styles.buttons_container}>
                <button type='submit' disabled={isSubmitting} className={styles.update_button}>Update</button>
                <button type='button' className={styles.cancel_update_button} onClick={(e) => handleOnCancel(e)}>Cancel</button>
            </div>         
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form>
    )
}

export default ChangeDeliveryDate