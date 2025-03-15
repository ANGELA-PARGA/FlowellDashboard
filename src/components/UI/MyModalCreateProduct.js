'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import styles from './components.module.css'
import CreateNewProduct from '../forms/CreateNewProduct'

const MyModalCreateProduct = () => {
    const [modalIsOpen, setIsOpen] = useState(false)    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button type='button' className={styles.create_product} onClick={openModal}>Create Product</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm create new product"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                <CreateNewProduct handleClose={()=> closeModal()}/>
            </Modal>
        </div>
    )
}

export default MyModalCreateProduct