import styles from "../page.module.css";
import { fetchAllProducts } from "@/lib/fetchingRequests";
import Pagination from "@/components/UI/Pagination";
import { SearchForm } from "@/components/UI/SearchForm";
import ProductsTable from "@/components/presentation/ProductsTable";
import MyModalCreateProduct from "@/components/UI/MyModalCreateProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyModalLogin from "@/components/UI/MyModalLogin";

export default async function Products(props) {
  const session = await getServerSession(authOptions);

    if (!session) {
        return <MyModalLogin />
    } 

  const searchParams = await props.searchParams;
  const page = Number(searchParams?.p) || 1;
  const term = searchParams?.term || '';
  const {data, expired} = await fetchAllProducts(page, { term });
  const pages = data.pagination.totalPages
  const totalProducts = data.pagination.totalProducts

  if (expired) {
    console.log('data is expired on CUSTOMERS server component')
    return <MyModalLogin />
  }

  return (
    <div className={styles.products_container}>
      <h1>Products: <span>{totalProducts} registered products</span></h1>
      <div className={styles.pagination_container}>
        <SearchForm type={'products'}/>
        <div>
            {Array.from({ length: pages }, (_, index) => (
                <Pagination key={index + 1} number={index + 1} />
            ))}                    
        </div>
      </div>
      <ProductsTable data={data}/>
      <MyModalCreateProduct />
    </div>
  );
}
