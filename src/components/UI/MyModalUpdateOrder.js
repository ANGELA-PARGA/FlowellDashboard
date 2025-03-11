'use client'
import {useState} from 'react'
import Modal from 'react-modal'
import styles from './components.module.css'
import ChangeDeliveryDate from '../forms/ChangeDeliveryDate'
import ChangeShippingInfo from '../forms/ChangeShippingInfo'
import ChangeItemsInfo from '../forms/ChangeItems'


const MyModalUpdateOrder = ({data, id, resourceType}) => {
    const [modalIsOpen, setIsOpen] = useState(false)    

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button type='button' className={styles.edit_button} onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm update order information"
                ariaHideApp={false}
                overlayClassName={styles.overlay}
                className={styles.content} 
                shouldCloseOnOverlayClick={false}                                         
            >
                {
                    resourceType === 'date' && 
                    <ChangeDeliveryDate id={id} handleClose={()=> closeModal()}/>
                }
                {
                    resourceType === 'address' && 
                    <ChangeShippingInfo  data={data} handleClose={()=> closeModal()}/>
                }
                {
                    resourceType === 'items' && 
                    <ChangeItemsInfo  data={data} handleClose={()=> closeModal()}/>
                }
            </Modal>
        </div>
    )
}

export default MyModalUpdateOrder