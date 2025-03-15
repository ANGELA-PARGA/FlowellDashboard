import { fetchProductsById } from '@/lib/fetchingRequests';
import ProductInformation from '@/components/presentation/ProductInformation';

export default async function ProductDetails(props) {   
    const params = await props.params;
    const {data, expired} = await fetchProductsById(params.id);
    const product = data.product_found

    if (expired) {
        console.log('data is expired on CUSTOMERS server component')
        /*return <MyModalLogin />;*/
    } 

    return (
        <ProductInformation product={product}/>
    );
}