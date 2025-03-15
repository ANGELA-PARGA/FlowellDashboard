import styles from "./components.module.css";
import { format, parseISO } from "date-fns";
import Link from "next/link";


export default async function ProductsTable({data}) {
    return (
        <div className={styles.table_container}>
            <table className={styles.products_table}>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>See details</th>
                </tr>
                </thead>
                <tbody>
                {data.products.map((product) => (
                    <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.category_name}</td>
                    <td>{product.name}</td>
                    <td>{product.color}</td>
                    <td>{format(parseISO(product.created_at), 'EE, MMM d yyyy')}</td>
                    <td>{format(parseISO(product.updated_at), 'EE, MMM d yyyy')}</td>
                    <td><Link href={`/admin_panel/products/${product.id}`}><button className={styles.see_details_button}>Details</button></Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}