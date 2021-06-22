import React, {useState, useEffect, useCallback} from 'react';
import Card from 'react-bootstrap/Card';
import { Bar } from 'react-chartjs-2';
import {useSelector} from 'react-redux'
import { buildChartWithData } from '../../../utils';
import { ChartBarConfig, DashboardBarChart } from '../../../models/charts/dashboardCharts';

const RevenueChart = (props) => {
    const [revenue, setRevenue] = useState({labels: [], data: []});
    const orders = useSelector(state => state.orders);

    const buildFrequencyChart = useCallback(() => {
        return buildChartWithData({...orders}, "revenue")
    }, [orders])

    useEffect(() => {
        let chartTools = buildFrequencyChart();
        setRevenue({
            labels: chartTools.map(item => item[0]),
            data: chartTools.map(item => item[1])
        })
    }, [buildFrequencyChart])

    const tickCallBack = value => `$${value}`
    const tooltipCallBack = item => `Revenue: $${item.formattedValue}`

    const chartOptions = new ChartBarConfig(null, tickCallBack, tooltipCallBack);
    const chartData = new DashboardBarChart([...revenue.labels], [...revenue.data], "Revenue")

    return (
        <Card className="dashboard-card my-4 text-left">
            <Card.Header className="profile-header mb-2">
                <h2>My Revenue</h2>
            </Card.Header>
            <Card.Body>
                {orders.data && orders.data.length > 0 &&
                <div className="dashboard-chart-wrapper">
                    <Bar data={chartData} options={chartOptions} />
                </div>}
                {orders.data.length === 0 && <p>No data to display</p>}
            </Card.Body>
        </Card>
    )
}
export default RevenueChart;