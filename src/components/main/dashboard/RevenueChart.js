import React, {useState, useEffect, useCallback} from 'react';
import Card from 'react-bootstrap/Card';
import { Bar } from 'react-chartjs-2';
import {useSelector} from 'react-redux'
import { buildChartWithData } from '../../utility/utility';

const RevenueChart = (props) => {
    const [revenue, setRevenue] = useState({labels: [], data: []});
    const orders = useSelector(state => state.orders);

    const buildFrequencyChart = useCallback(() => {
        return buildChartWithData(orders, "revenue")
    }, [orders])

    useEffect(() => {
        let chartTools = buildFrequencyChart();
        setRevenue({
            labels: chartTools.map(item => item[0]),
            data: chartTools.map(item => item[1])
        })
    }, [buildFrequencyChart])

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    callback: function(value) {
                        return `$${value}`;
                    }
                }
            },
        },
        plugins: {
            legend: {display: false},  
            tooltip: {
                callbacks: {
                    label: function(item, obj) {
                        return `$${item.formattedValue}`
                    }
                }
            },
        },
    }
    const chartData = {
        labels: [...revenue.labels],
        datasets: [{
            label: 'Orders',
            data: [...revenue.data],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
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