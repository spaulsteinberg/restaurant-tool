import React, {useState, useEffect, useCallback} from 'react';
import { Bar } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import {useSelector} from 'react-redux'
import { buildChartWithData } from '../../../utils';
import { ChartBarConfig, DashboardBarChart } from '../../../models/charts/dashboardCharts';

const PopularityChart = (props) => {

    const [orderFrequency, setOrderFrequency] = useState({labels: [], data: []});
    const orders = useSelector(state => state.orders);

    const buildFrequencyChart = useCallback(() => {
        return buildChartWithData({...orders}, "orders")
    }, [orders])

    useEffect(() => {
        let chartTools = buildFrequencyChart();
        setOrderFrequency({
            labels: chartTools.map(item => item[0]),
            data: chartTools.map(item => item[1])
        })
    }, [buildFrequencyChart])

    const chartOptions = new ChartBarConfig(0);
    const chartData = new DashboardBarChart([...orderFrequency.labels],[...orderFrequency.data], "Orders");

    return (
        <Card className="dashboard-card my-4 text-left">
            <Card.Header className="profile-header mb-2">
                <h2>Last Weeks Orders</h2>
            </Card.Header>
            <Card.Body>
                {orders.data && orders.data.length > 0 && <div className="dashboard-chart-wrapper">
                    <Bar data={chartData} options={chartOptions} />
                </div>}
                {orders.data.length === 0 && <p>No data to display</p>}
            </Card.Body>
        </Card>
    )
}

export default PopularityChart;
