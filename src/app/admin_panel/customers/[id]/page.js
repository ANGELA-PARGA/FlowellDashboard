import { fetchUserInformation } from "@/lib/fetchingRequests";
import { fetchUserOrders } from "@/lib/fetchingRequests";
import CustomerInfo from "@/components/presentation/CustomerInfo";
import CustomerOrders from "@/components/presentation/CustomerOrders";
import styles from '../../page.module.css'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyModalLogin from "@/components/UI/MyModalLogin";


export default async function CustomerDetails(props) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <MyModalLogin />;
    }

    const params = await props.params;
    const[userInfoResults, userOrdersResults] = await Promise.all([
        fetchUserInformation(params.id),
        fetchUserOrders(params.id)
    ])

    const {data: userInfo, expired: firstExpired} = userInfoResults;
    const {data: userOrders, expired: secondExpired} = userOrdersResults;

    if (firstExpired || secondExpired) {
        return <MyModalLogin />
    } 
    
    const user = userInfo.user
    const orders = userOrders.orders

    return (
        <section className={styles.customer_details_container}>
            <CustomerInfo user={user}/>
            <CustomerOrders orders={orders}/>                     
        </section>
    );
}