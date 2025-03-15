'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './components.module.css'

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
            <p style={{ fontWeight: "bold", margin: 0 }}>{payload[0].payload.status}</p>
            <p style={{ margin: 0 }}>Orders: {payload[0].value}</p>
        </div>
    );
};

const OrdersChart = ({orderInfo}) => {
    return (
        <section className={styles.card_details_container}>
            <div className={styles.chart_details}>
                <h1>Total Orders: <span>{orderInfo.total_orders}</span></h1>
                <p>✅ Total Revenue: <span>${orderInfo.total_revenue}</span></p>
            </div>            
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderInfo.status_summary} width={'50%'}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" stroke="#059beb"></XAxis>
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#06a7fd15'}}/>
                    <Bar dataKey="count" fill="#059beb" barSize={60}  radius={[5, 5, 0, 0]}  fillOpacity={0.9} />
                </BarChart>
            </ResponsiveContainer>           
        </section>
    )
}

export default OrdersChart