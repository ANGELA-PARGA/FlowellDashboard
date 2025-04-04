'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const schema = yup.object({
    email: yup.string().email('Email format is not valid').required('The email is required'),
    password: yup.string().required('The password is required')
})

export default function LoginForm() {
    const [loginError, setLoginError] = useState();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting}, trigger} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        await schema.validate(data);
        try {
            const responseNextAuth = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (responseNextAuth?.error) {
                console.log(responseNextAuth)
                throw new Error(responseNextAuth.error)
            }
            router.push("/admin_panel");
        } catch (error) {
            console.error(error)
            setLoginError(error.message);        
        }
    };

    return (    
        <main className={styles.login_main_container}>
            <div className={styles.login_form_container}>
                <h2>Sign in to your account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>          
                    <div>
                        <input {...register('email')} type="email" name="email" id="email" placeholder="Email*" onBlur={() => {
                            trigger('email'); 
                        }} />
                        <div className={styles.error_label_container}>
                            <label htmlFor="email">Enter your email</label> 
                            <p className={styles.error_login_form}>{errors.email?.message}</p>
                        </div>                        
                    </div>
                    <div>
                        <input {...register('password')} type="password" name="password" id="password" placeholder="Password*" onBlur={() => {
                            trigger('password');
                        }} />
                        <div className={styles.error_label_container}>
                            <label htmlFor="password">Enter your password</label>
                            <p className={styles.error_login_form}>{errors.password?.message}</p>
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className={styles.login_submit_button}>Log in</button>
                </form> 
                <div>
                    <p className={styles.error_login_form}>{loginError}</p>
                </div>
            </div>            
        </main>
    );
}