import styles from "./page.module.css";
import { fetchAllProducts } from "@/lib/fetchingRequests";
import { format, parseISO } from "date-fns";
import Pagination from "@/components/UI/Pagination";
import { SearchForm } from "@/components/UI/SearchForm";
import Link from "next/link";

export default async function Products(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.p) || 1;
  const term = searchParams?.term || '';
  const {data, expired} = await fetchAllProducts(page, { term });
  const pages = data.pagination.totalPages
  const totalProducts = data.pagination.totalProducts

  if (expired) {
    console.log('data is expired on CUSTOMERS server component')
    /*return <MyModalLogin />;*/
  }

  return (
    <div className={styles.products_container}>
      <h1>Products: <span>{totalProducts} registered products</span></h1>
      <div className={styles.pagination_container}>
        <SearchForm />
        <div>
            {Array.from({ length: pages }, (_, index) => (
                <Pagination key={index + 1} number={index + 1} />
            ))}                    
        </div>
      </div>
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
              <td><Link href={`/admin_panel/customers/${product.id}`}><button className={styles.see_details_button}>Details</button></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
