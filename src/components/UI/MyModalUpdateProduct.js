'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import styles from './components.module.css'
import ChangeProductInfo from '../forms/ChangeProductInfo'
import ChangeProductDetails from '../forms/ChangeProductDetails'



const MyModalUpdateProduct = ({data, resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false)    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button type='button' className={styles.edit_button} onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm update product information"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                {
                    resourceType === 'information' && 
                    <ChangeProductInfo data={data} handleClose={()=> closeModal()}/>
                }
                {
                    resourceType === 'details' && 
                    <ChangeProductDetails  data={data} handleClose={()=> closeModal()}/>
                }
            </Modal>
        </div>
    )
}

export default MyModalUpdateProduct