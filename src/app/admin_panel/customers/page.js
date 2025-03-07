
import styles from "./page.module.css";
import { fetchAllUsers } from "@/lib/fetchingRequests";
import { format, parseISO } from "date-fns";
import Pagination from "@/components/UI/Pagination";
import { SearchForm } from "@/components/UI/SearchForm";
import Link from "next/link";

export default async function Customers(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.p) || 1;
  const term = searchParams?.term || '';
  const {data, expired} = await fetchAllUsers(page, { term });
  const pages = data.pagination.totalPages
  const totalUsers = data.pagination.totalUsers

  if (expired) {
    console.log('data is expired on CUSTOMERS server component')
    /*return <MyModalLogin />;*/
  }
  
  return (
    <div className={styles.customers_container}>
      <h1>Customers: <span>{totalUsers} registered customers</span></h1>
      <div className={styles.pagination_container}>
        <SearchForm />
        <div>
            {Array.from({ length: pages }, (_, index) => (
                <Pagination key={index + 1} number={index + 1} />
            ))}                    
        </div>
      </div>
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
