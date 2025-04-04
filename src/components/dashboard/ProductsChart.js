'use client'
import styles from './components.module.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
        <div style={{
            backgroundColor: "#1f2937", // Dark background
            color: "#ffffff", // White text
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
        }}>
            <p style={{ fontWeight: "bold", margin: 0 }}>{payload[0].payload.product_name}</p>
            <p style={{ margin: 0 }}>Quantity: {payload[0].payload.qty_purchased}</p>
            <p style={{ fontWeight: "bold", margin: 0 }}>Revenue: ${payload[0].payload.total_revenue}</p>
        </div>
    );
};

const ProductsChart = ({products}) => {
    return (
        <section className={styles.card_details_container}>
            <div className={styles.chart_details}>
                <h1>3 best-selling products</h1>
                <p>⭐ {products[0].product_name}: <span>${products[0].total_revenue}</span></p>
            </div>
            <ResponsiveContainer width="100%" maxHeight={300}>
                <BarChart data={products} width={'50%'}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product_id" stroke="#059beb" tickFormatter={(id) => `ID# ${id}`}></XAxis>
                    <YAxis/>
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#06a7fd15'}}/>
                    <Bar dataKey="qty_purchased" fill="#059beb" barSize={60}  radius={[5, 5, 0, 0]}  fillOpacity={0.9} />
                </BarChart>
            </ResponsiveContainer>           
        </section>
    )
}

export default ProductsChart