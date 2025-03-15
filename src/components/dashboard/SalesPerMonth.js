'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './components.module.css'

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
        <div style={{
            backgroundColor: "#1f2937",
            color: "#ffffff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
        }}>
            <p style={{ fontWeight: "bold", margin: 0 }}>{payload[0].payload.month}</p>
            <p style={{ margin: 0 }}>Orders: {payload[0].payload.total_orders}</p>
        </div>
    );
};

const SalesPerMonth = ({ordersByMonth}) => {
    const ordersForChart = [{ month: 'January ', month_number: '1', total_orders: '0' }, ...ordersByMonth.ordersByMonth]

    return (
        <section className={styles.card_details_container}>
            <div className={styles.chart_details}>
                <h1>Orders Placed Per Month</h1>
                <p>✅ Month with most orders <span>{ordersByMonth.monthWithMostOrders.month} = {ordersByMonth.monthWithMostOrders.total_orders}</span></p>
            </div>            
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ordersForChart} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#059beb"></XAxis>
                    <YAxis />
                    <Tooltip content={<CustomTooltip />}/>
                    <Line dataKey="total_orders" type="monotone" stroke="#059beb"/>
                </LineChart>
            </ResponsiveContainer>           
        </section>
    )
}

export default SalesPerMonth