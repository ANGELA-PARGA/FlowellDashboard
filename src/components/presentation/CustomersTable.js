
import styles from "./components.module.css";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default async function CustomersTable({data}) {

    return (
        <div className={styles.table_container}>
        <table className={styles.customers_table}>
            <thead>
            <tr>
                <th># ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>See details</th>
            </tr>
            </thead>
            <tbody>
            {data.users.map((user) => (
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{format(parseISO(user.created_at), 'EE, MMM d yyyy')}</td>
                <td><Link href={`/admin_panel/customers/${user.id}`}><button className={styles.see_details_button}>Details</button></Link></td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}