
import styles from "./page.module.css";
import { fetchAllOrders } from "@/lib/fetchingRequests";
import { format, parseISO } from "date-fns";
import Pagination from "@/components/UI/Pagination";
import { SearchForm } from "@/components/UI/SearchForm";
import Link from "next/link";

export default async function Orders(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.p) || 1;
  const term = searchParams?.term || '';
  const {data, expired} = await fetchAllOrders(page, { term });
  const pages = data.pagination.totalPages
  const totalOrders = data.pagination.totalOrders
  
  if (expired) {
    console.log('data is expired on ORDERS server component')
    /*return <MyModalLogin />;*/
  }

  return (
    <div className={styles.orders_container}>
      <h1>Orders: <span>{totalOrders} registered</span></h1>
      <div className={styles.pagination_container}>
        <SearchForm />
        <div>
            {Array.from({ length: pages }, (_, index) => (
                <Pagination key={index + 1} number={index + 1} />
            ))}                    
        </div>
      </div>
      <table className={styles.orders_table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Created at</th>
            <th>Total</th>
            <th>Delivery date</th>
            <th>Status</th>
            <th>Updated at</th>
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
