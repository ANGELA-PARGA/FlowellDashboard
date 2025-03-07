import styles from './page.module.css'
import { format, parseISO } from "date-fns";
import { fetchOrderById } from '@/lib/fetchingRequests';


export default async function OrderCard(props) {   
    const params = await props.params;
    const {data, expired} = await fetchOrderById(params.id);
    const order = data.order[0]

    if (expired) {
        console.log('data is expired on CUSTOMERS server component')
        /*return <MyModalLogin />;*/
    } 

    return (
        <section className={styles.order_info_container}>
            <div className={styles.order_details_card}>
                <h3>Order #{order.id}</h3>
                <p>Created: {format(parseISO(order.created_at), 'EE, MMMM d yyyy')}</p>
                <p>Status: {order.status}</p>
            </div>
            <div className={styles.order_details_card}>
                <h3>Delivery Date</h3>
                <p>Delivery date: {format(parseISO(order.delivery_date), 'EE, MMMM d yyyy')}</p>
                {
                    order.status === 'COMPLETED' || order.status === 'IN TRANSIT'?
                    <button type='button' disabled>Edit</button>: 
                    <button type='button' disabled>Edit</button>                   
                }
                {/*<MyModalUpdateOrder id={order.id} resourceType={'date'}/>*/}            
            </div>
            <div className={styles.order_details_card}>
                <h3>Items</h3>
                <ul className={styles.ordered_items_container}>
                    {order.items.map((item)=>{            
                        return (
                        <li key={item.product_id} className={styles.ordered_items}>
                            <p>Item: {item.name}</p>
                            <p>Quantity: {item.qty} case</p>
                        </li>
                        )            
                    })}
                </ul>
                {
                    order.status === 'COMPLETED' || order.status === 'IN TRANSIT'?
                    <button type='button' disabled>Edit</button>: 
                    <button type='button'>Edit</button>                    
                }
                {/*<MyModalUpdateOrder id={order.id} resourceType={'date'}/>*/}
            </div>
            <div>
                <br />
                <h3>Total: ${order.total.toFixed(2)}</h3>
                <br />
            </div>
            <div className={styles.order_details_card}>
                <h3>Shipping Information</h3>
                <p>{order.shipping_info.address}</p>
                <p>{order.shipping_info.city}</p>
                <p>{order.shipping_info.state}</p>
                <p>{order.shipping_info.zip_code}</p>
                <p>Phone: {order.shipping_info.phone}</p>
                {
                    order.status === 'COMPLETED' || order.status === 'IN TRANSIT' ?
                    <button disabled>Edit</button>:
                    <button >Edit</button>
                }
                {/*<MyModalUpdateOrder data={order} resourceType={'address'}/>*/}                
            </div>
        </section>
    );
}