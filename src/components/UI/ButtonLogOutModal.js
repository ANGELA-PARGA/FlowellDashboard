'use client'

import styles from './components.module.css'
import handleLogOut from '@/actions/logout'
import { signOut } from "next-auth/react";


export default function ButtonLogOutModal({ handleClose }) {

    const onClickLogOut = async () => {        
        try {
            await signOut({ redirect: false });
            await handleLogOut();            
            handleClose();
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button className={styles.button_login_again} onClick={() => onClickLogOut()}>
            Login
        </button>
    );
}
