import { fetchProductsById } from '@/lib/fetchingRequests';
import ProductInformation from '@/components/presentation/ProductInformation';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyModalLogin from "@/components/UI/MyModalLogin";

export default async function ProductDetails(props) {  
    const session = await getServerSession(authOptions);

    if (!session) {
        return <MyModalLogin />
    } 
    
    const params = await props.params;
    const {data, expired} = await fetchProductsById(params.id);
    const product = data.product_found

    if (expired) {
        console.log('data is expired on CUSTOMERS server component')
        return <MyModalLogin />
    } 

    return (
        <ProductInformation product={product}/>
    );
}