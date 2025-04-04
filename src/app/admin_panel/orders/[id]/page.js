import { fetchOrderById } from '@/lib/fetchingRequests';
import OrderInformation from '@/components/presentation/OrderInformation';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyModalLogin from "@/components/UI/MyModalLogin";

export default async function OrderDetails(props) { 
    const session = await getServerSession(authOptions); 
    if (!session) {
        return <MyModalLogin />
    }

    const params = await props.params;
    const {data, expired} = await fetchOrderById(params.id);
    if (expired) {
        return <MyModalLogin />
    } 
    const order = data.order[0]

    return (
        <OrderInformation order={order}/>
    );
}