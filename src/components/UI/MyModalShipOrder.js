'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import styles from './components.module.css'
import ShipOrder from '../forms/ShipOrder'


const MyModalShipOrder = ({id}) => {
    const [modalIsOpen, setIsOpen] = useState(false)    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button type='button' className={styles.ship_button} onClick={openModal}>Ship Order</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm shipping the order"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                <p className={styles.modalText}>To ship the order insert the tracking number</p>
                <ShipOrder id={id} handleClose={()=> closeModal()}/>
            </Modal>
        </div>
    )
}

export default MyModalShipOrder