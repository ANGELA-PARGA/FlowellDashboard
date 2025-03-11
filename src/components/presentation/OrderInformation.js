import styles from './components.module.css'
import { format, parseISO } from "date-fns";
import MyModalUpdateOrder from '../UI/MyModalUpdateOrder';

export default async function OrderInformation({order}) {   

    return (
        <section className={styles.order_info_container}>
            <div className={styles.cards_details_container}>
                <div className={styles.cards_details}>
                    <h3>Order #{order.id}</h3>
                    <p><span>Created:</span> {format(parseISO(order.created_at), 'EE, MMMM d yyyy')}</p>
                    <p><span>Status:</span> {order.status}</p>
                </div>
                <div className={styles.cards_details}>
                    <h3>Delivery Date</h3>
                    <p><span>Delivery date:</span> {format(parseISO(order.delivery_date), 'EE, MMMM d yyyy')}</p>
                    {
                        order.status === 'COMPLETED' || order.status === 'IN TRANSIT'?
                        <button type='button' disabled>Edit</button>: 
                        <MyModalUpdateOrder id={order.id} resourceType={'date'}/>                   
                    }           
                </div>
                <div className={styles.cards_details}>
                    <h3>Shipping Information</h3>
                    <p>{order.shipping_info.address}</p>
                    <p>{order.shipping_info.city}</p>
                    <p>{order.shipping_info.state}</p>
                    <p>{order.shipping_info.zip_code}</p>
                    <p><span>Phone:</span> {order.shipping_info.phone}</p>
                    {
                        order.status === 'COMPLETED' || order.status === 'IN TRANSIT' ?
                        <button type='button' disabled>Edit</button>:
                        <MyModalUpdateOrder data={order} resourceType={'address'}/>
                    }          
                </div>
            </div>
            <div className={styles.cards_details}>
                <h3>Items</h3>
                <ul className={styles.ordered_items_container}>
                    {order.items.map((item)=>{            
                        return (
                        <li key={item.product_id} className={styles.ordered_items}>
                            <p><span>Item:</span> {item.name}</p>
                            <p><span>Quantity:</span> {item.qty} case</p>
                            <p><span>Price per case:</span> ${item.price}</p>
                            <p><span>Subtotal:</span> ${item.price * item.qty}</p>
                            {
                                order.status === 'COMPLETED' || order.status === 'IN TRANSIT'?
                                <button type='button' disabled >Edit</button>: 
                                <MyModalUpdateOrder data={{id: order.id, item:item}} resourceType={'items'}/>                    
                            }
                        </li>
                        )            
                    })}
                </ul>
            </div>
            <div>
                <br />
                <h3>Total: ${order.total.toFixed(2)}</h3>
                <br />
            </div>
        </section>
    );
}