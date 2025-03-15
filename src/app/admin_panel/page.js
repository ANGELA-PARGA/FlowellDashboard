import styles from "./page.module.css";
import OrdersChart from "@/components/dashboard/OrdersChart";
import ProductsChart from "@/components/dashboard/ProductsChart";
import SalesPerMonth from "@/components/dashboard/SalesPerMonth";
import { fetchOrdersDashboardInfo } from "@/lib/fetchingRequests";
import { fetchProductsDashboardInfo } from "@/lib/fetchingRequests";

export default async function AdminPanel() {
  const [ordersResult, productsResult] = await Promise.all([
    fetchOrdersDashboardInfo(),
    fetchProductsDashboardInfo()
  ]);

  const { data: orders, expired: firstExpired } = ordersResult;
  const { data: products, expired: secondExpired } = productsResult;

  console.log('orders result',orders)

  if (firstExpired || secondExpired) {
    console.log('data is expired on CUSTOMERS server component')
    /*return <MyModalLogin />;*/
  } 

  return (
    <div className={styles.admin_panel}>
      <OrdersChart orderInfo={orders.orders}/>
      <ProductsChart products={products.products}/>
      <SalesPerMonth ordersByMonth={orders} />      
    </div>
  );
}
