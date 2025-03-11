
import styles from "./components.module.css";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default async function OrdersTable({data}) {
    return (
        <div className={styles.table_container}>
            <table className={styles.orders_table}>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Created at</th>
                    <th>Total</th>
                    <th>Delivery date</th>
                    <th>Status</th>
                    <th>Updated at</th>
                    <th>See details</th>
                </tr>
                </thead>
                <tbody>
                {data.orders.map((order) => (
                    <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{format(parseISO(order.created_at), 'EE, MMM d yyyy')}</td>
                    <td>{order.total}</td>
                    <td>{format(parseISO(order.delivery_date), 'EE, MMM d yyyy')}</td>
                    <td>{order.status}</td>
                    <td>{format(parseISO(order.updated_at), 'EE, MMM d yyyy')}</td>
                    <td><Link href={`/admin_panel/orders/${order.id}`}><button className={styles.see_details_button}>Details</button></Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}