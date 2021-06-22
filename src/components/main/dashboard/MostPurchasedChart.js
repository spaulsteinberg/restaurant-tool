import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ChartBarConfig, DashboardBarChart } from '../../../models/charts/dashboardCharts';
import Card from 'react-bootstrap/Card';
import {Bar} from 'react-chartjs-2'

const MostPurchasedChart = () => {

    const content = useSelector(state => state.orders.data);
    const [items, setItems] = useState({labels: [], data: []})

    const accumulateData = useCallback(() => {
        let map = new Map();
        const orderItems = content.slice().map(order => order.order.food);
        for (const items of orderItems){
            for (const food of items){
                const key = food.main.charAt(0).toUpperCase() + food.main.slice(1).toLowerCase();
                if (!map.has(key)){
                    map.set(key, food.price)
                }
                else {
                    map.set(key, Math.ceil((map.get(key) + food.price)*100)/ 100)
                }
            }
        }
        let foodArray = [];
        for (const [key, value] of map.entries()){
            foodArray.push([key, value])
        }
        
        return foodArray.sort((a, b) => b[1] - a[1]).slice(0, foodArray.length >= 7 ? 7 : foodArray.length - 1).reverse();
    }, [content])

    useEffect(() => {
        let datasets = accumulateData();
        setItems({
            labels: datasets.map(data => data[0]),
            data: datasets.map(data => data[1])
        })
    }, [accumulateData])

    const tickCallBack = value => `$${value}`
    const tooltipCallBack = item => `Earnings: $${item.formattedValue}`

    const chartOptions = new ChartBarConfig(null, tickCallBack, tooltipCallBack);

    const chartData = new DashboardBarChart([...items.labels],[...items.data], "Earnings")

    return (
        <Card className="dashboard-card my-4 text-left">
            <Card.Header className="profile-header mb-2">
                <h2>Highest Earning Items</h2>
            </Card.Header>
            <Card.Body>
                {content && content.length > 0 && <div className="dashboard-chart-wrapper">
                    <Bar data={chartData} options={chartOptions} />
                </div>}
                {content.length === 0 && <p>No data to display</p>}
            </Card.Body>
        </Card>
    )
}

export default MostPurchasedChart;
