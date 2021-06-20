import React, {useState, useEffect, useCallback} from 'react';
import { Bar } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import {useSelector} from 'react-redux'

const PopularityChart = (props) => {

    const [orderFrequency, setOrderFrequency] = useState({labels: [], data: []});
    const orders = useSelector(state => state.orders)

    const buildFrequencyChart = useCallback(() => {
        let revenueData = {};
        for (let order of orders.data) {
            // if date exists
            if (revenueData.hasOwnProperty(order.date)){
                revenueData[order.date].revenue += order.totalCost
                revenueData[order.date].orders += 1
            } else {
                revenueData[order.date] = {
                    revenue: order.totalCost,
                    orders: 1
                }
            }
        }
        let structureDataForChart = [];
        for (const [key, value] of Object.entries(revenueData)) {
            structureDataForChart.push([key, value.orders])
        }
        return structureDataForChart;
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
            yAxes: [ {
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            legend: {display: false},
        },
    }
    const testChart = {
        labels: [...orderFrequency.labels],
        datasets: [{
            label: 'Orders',
            data: [...orderFrequency.data],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
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
                {orders.data && <div className="dashboard-chart-wrapper">
                    <Bar data={testChart} options={chartOptions} />
                </div>}
            </Card.Body>
        </Card>
    )
}

export default PopularityChart;
