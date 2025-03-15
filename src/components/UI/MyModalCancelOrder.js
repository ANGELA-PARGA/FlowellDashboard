'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import styles from './components.module.css'
import ButtonCancelOrder from './ButtonCancelOrder'


const MyModalCancelOrder = ({id}) => {
    const [modalIsOpen, setIsOpen] = useState(false)    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button type='button' className={styles.cancel_button} onClick={openModal}>Cancel Order</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm cancelling order"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                <p className={styles.modalText}>Are you sure you want to cancel this order? This cannot be undone</p>
                <div className={styles.modalButtons}>
                    <ButtonCancelOrder id={id} handleClose={()=> closeModal()}/>
                    <button className={styles.edit_button} onClick={closeModal}>Keep order</button>
                </div>
            </Modal>
        </div>
    )
}

export default MyModalCancelOrder