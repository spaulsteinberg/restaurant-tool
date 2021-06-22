import React from 'react'
import { ChartBarConfig, DashboardBarChart } from '../../../models/charts/dashboardCharts';
import DefaultBarChart from '../../utility/DefaultBarChart';
import MostPurchased from './MostPurchased';

const MPFood = ({labels, data}) => {

    const tickCallBack = value => `$${value}`
    const tooltipCallBack = item => `Earnings: $${item.formattedValue}`

    const chartOptions = new ChartBarConfig(null, tickCallBack, tooltipCallBack);

    const chartData = new DashboardBarChart([...labels],[...data], "Earnings")

    return (
        <DefaultBarChart title="Highest Earning Items" masterData={data} chartData={chartData} chartOptions={chartOptions} />

    )
}

export default MostPurchased(MPFood, "food");
