import { format, parseISO } from "date-fns";
import Link from "next/link";
import styles from './components.module.css'

export default async function CustomerOrders({orders}) {
    return (
        <div className={styles.orders_container}>
            { orders && orders.length > 0 ? (
                <>
                <h1>Customer&apos;s History Orders</h1>
                <div className={styles.table_container}>
                <table className={styles.orders_table}>
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Status</th>
                            <th>Delivery Date</th>
                            <th>Total</th>
                            <th>See details</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{format(parseISO(order.created_at), 'EE, MMMM d yyyy')}</td>
                            <td>{format(parseISO(order.updated_at), 'EE, MMMM d yyyy')}</td>
                            <td>{order.status}</td>
                            <td>{format(parseISO(order.delivery_date), 'EE, MMMM d yyyy')}</td>
                            <td>{order.total.toFixed(2)}</td>
                            <td><Link href={`/admin_panel/orders/${order.id}`}><button className={styles.see_details_button}>Details</button></Link></td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div> 
                </>               
                ) :(
                    <>
                    <h1>Customer&apos;s History Orders</h1>
                    <p>The user does not have any registered orders</p>
                    </>
                )
            }
        </div>
    )
}