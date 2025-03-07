import { fetchUserInformation } from "@/lib/fetchingRequests";
import { fetchUserOrders } from "@/lib/fetchingRequests";
import CustomerInfo from "@/components/customers/CustomerInfo";
import CustomerOrders from "@/components/customers/CustomerOrders";
import styles from './page.module.css'


export default async function CustomerDetails(props) {
    const params = await props.params;
    const {data: userInfo, expired: firstExpired} = await fetchUserInformation(params.id);
    const {data: userOrders, expired: secondExpired} = await fetchUserOrders(params.id);
    const user = userInfo.user
    const orders = userOrders.orders

    if (firstExpired || secondExpired) {
        console.log('data is expired on CUSTOMERS server component')
        /*return <MyModalLogin />;*/
    }    

    return (
        <section className={styles.customer_details_container}>
            <CustomerInfo user={user}/>
            <CustomerOrders orders={orders}/>                     
        </section>
    );
}