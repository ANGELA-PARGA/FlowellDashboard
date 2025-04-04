import styles from "../page.module.css";
import { fetchAllOrders } from "@/lib/fetchingRequests";
import Pagination from "@/components/UI/Pagination";
import { SearchForm } from "@/components/UI/SearchForm";
import OrdersTable from "@/components/presentation/OrdersTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyModalLogin from "@/components/UI/MyModalLogin";

export default async function Orders(props) {
  const session = await getServerSession(authOptions);

  if (!session) {
      return <MyModalLogin />
  }

  const searchParams = await props.searchParams;
  const page = Number(searchParams?.p) || 1;
  const term = searchParams?.term || '';
  const {data, expired} = await fetchAllOrders(page, { term });
  
  if (expired) {
    return <MyModalLogin />
  }

  const pages = data.pagination.totalPages
  const totalOrders = data.pagination.totalOrders


  return (
    <div className={styles.orders_container}>
      <h1>Orders: <span>{totalOrders} registered</span></h1>
      <div className={styles.pagination_container}>
        <SearchForm type={'orders'}/>
        <div>
            {Array.from({ length: pages }, (_, index) => (
                <Pagination key={index + 1} number={index + 1} />
            ))}                    
        </div>
      </div>
      <OrdersTable data={data}/>
    </div>
  );
}
