import { fetchOrderById } from '@/lib/fetchingRequests';
import OrderInformation from '@/components/presentation/OrderInformation';


export default async function OrderDetails(props) {   
    const params = await props.params;
    const {data, expired} = await fetchOrderById(params.id);
    const order = data.order[0]

    if (expired) {
        console.log('data is expired on CUSTOMERS server component')
        /*return <MyModalLogin />;*/
    } 

    return (
        <OrderInformation order={order}/>
    );
}