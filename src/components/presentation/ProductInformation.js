import styles from './components.module.css'
import { format, parseISO } from "date-fns";
import Image from 'next/image';
import MyModalUpdateProduct from '../UI/MyModalUpdateProduct';


export default async function ProductInformation({product}) {   
    return (
        <section className={styles.product_info_container}>
            <div className={styles.product_info_subcontainer}> 
                <div className={styles.cards_details}>
                    <p><span>Product ID: </span>{product.id}</p>
                    <p><span>Created:</span> {format(parseISO(product.created_at), 'EE, MMMM d yyyy')}</p>
                    <p><span>Updated:</span> {format(parseISO(product.updated_at), 'EE, MMMM d yyyy')}</p>
                    <p><span>Stock available:</span> {product.stock}</p>
                    <p><span>Sold units:</span> {product['sold units']}</p>
                    <button type='button' className={styles.edit_button} >Add stock</button> 
                </div>
                <div className={styles.product_images_container}>
                    { product.images_urls.map((image, index) => {
                        return(
                            <Image 
                                key={index}
                                src={image}
                                width={150}
                                height={150}
                                style={{
                                    borderRadius: '5%'
                                }}
                                priority
                                alt={`mini image of ${product.name}`}>
                            </Image>
                        )
                    })}
                </div>
            </div>
            <div className={styles.product_info_subcontainer}>
                <div className={styles.cards_details}>
                    <h3>Characteristics</h3>
                    <p><span>Name:</span> {product.name}</p>
                    <p><span>Description:</span> {product.description}</p>
                    <p><span>Color:</span> {product.color}</p>
                    <p><span>Category:</span> {product.category}</p>               
                    <MyModalUpdateProduct data={product} resourceType={'information'}/>           
                </div>
                <div className={styles.cards_details}>
                    <h3>Measurments and lasting life</h3>
                    <p><span>Stem length:</span> {product.stem_length_cm} cm</p>
                    <p><span>Bloom size:</span> {product.bloom_size_cm} cm</p>
                    <p><span>Blooms per stem:</span> {product.blooms_per_stem}</p>
                    <p><span>Life span:</span> {product.life_in_days} days</p>
                    <p><span>Quantity per case:</span> {product.qty_per_case}</p>
                    <p><span>Measure per case:</span> {product.measure_per_case}</p>
                    <p><span>Price per case:</span> ${product.price_per_case}</p>    
                    <MyModalUpdateProduct data={product} resourceType={'details'}/>                
                </div>
            </div>
        </section>
    );
}