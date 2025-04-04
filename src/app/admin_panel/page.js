import styles from "./page.module.css";
import OrdersChart from "@/components/dashboard/OrdersChart";
import ProductsChart from "@/components/dashboard/ProductsChart";
import SalesPerMonth from "@/components/dashboard/SalesPerMonth";
import { fetchOrdersDashboardInfo } from "@/lib/fetchingRequests";
import { fetchProductsDashboardInfo } from "@/lib/fetchingRequests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyModalLogin from "@/components/UI/MyModalLogin";

export default async function AdminPanel() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <MyModalLogin />;
  }

  const [ordersResult, productsResult] = await Promise.all([
    fetchOrdersDashboardInfo(),
    fetchProductsDashboardInfo()
  ]);

  const { data: orders, expired: firstExpired } = ordersResult;
  const { data: products, expired: secondExpired } = productsResult;

  if (firstExpired || secondExpired) {
    return <MyModalLogin />
  } 

  return (
    <div className={styles.admin_panel}>
      <OrdersChart orderInfo={orders.orders}/>
      <ProductsChart products={products.products}/>
      <SalesPerMonth ordersByMonth={orders} />      
    </div>
  );
}
