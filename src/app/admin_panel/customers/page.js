import styles from "../page.module.css";
import { fetchAllUsers } from "@/lib/fetchingRequests";
import Pagination from "@/components/UI/Pagination";
import { SearchForm } from "@/components/UI/SearchForm";
import CustomersTable from "@/components/presentation/CustomersTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyModalLogin from "@/components/UI/MyModalLogin";

export default async function Customers(props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <MyModalLogin />
  }
  
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.p) || 1;
  const term = searchParams?.term || '';
  const {data, expired} = await fetchAllUsers(page, { term });

  if (expired) {
    return <MyModalLogin />
  }

  const pages = data.pagination.totalPages
  const totalUsers = data.pagination.totalUsers
  
  return (
    <div className={styles.customers_container}>
      <h1>Customers: <span>{totalUsers} registered customers</span></h1>
      <div className={styles.pagination_container}>
        <SearchForm type={'customers'}/>
        <div>
            {Array.from({ length: pages }, (_, index) => (
                <Pagination key={index + 1} number={index + 1} />
            ))}                    
        </div>
      </div>
      <CustomersTable data={data}/>      
    </div>
  );
}

