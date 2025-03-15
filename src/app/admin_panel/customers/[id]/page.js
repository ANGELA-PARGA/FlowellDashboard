import { fetchUserInformation } from "@/lib/fetchingRequests";
import { fetchUserOrders } from "@/lib/fetchingRequests";
import CustomerInfo from "@/components/presentation/CustomerInfo";
import CustomerOrders from "@/components/presentation/CustomerOrders";
import styles from '../../page.module.css'


export default async function CustomerDetails(props) {
    const params = await props.params;

    const[userInfoResults, userOrdersResults] = await Promise.all([
        fetchUserInformation(params.id),
        fetchUserOrders(params.id)
    ])

    const {data: userInfo, expired: firstExpired} = userInfoResults;
    const {data: userOrders, expired: secondExpired} = userOrdersResults;
    
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