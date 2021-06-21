import React, {useState, useEffect, useCallback} from 'react';
import { Bar } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import {useSelector} from 'react-redux'
import { buildChartWithData } from '../../utility/utility';

const PopularityChart = (props) => {

    const [orderFrequency, setOrderFrequency] = useState({labels: [], data: []});
    const orders = useSelector(state => state.orders);

    const buildFrequencyChart = useCallback(() => {
        return buildChartWithData(orders, "orders")
    }, [orders])

    useEffect(() => {
        let chartTools = buildFrequencyChart();
        setOrderFrequency({
            labels: chartTools.map(item => item[0]),
            data: chartTools.map(item => item[1])
        })
    }, [buildFrequencyChart])

    const chartOptions = {
        responsive: true,
        scales: {
            yAxes: {
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            },
        },
        plugins: {
            legend: {display: false},
        },
    }
    const chartData = {
        labels: [...orderFrequency.labels],
        datasets: [{
            label: 'Orders',
            data: [...orderFrequency.data],
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
