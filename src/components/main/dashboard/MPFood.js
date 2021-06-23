import React from 'react'
import { ChartConfig, DashboardBarChart } from '../../../models/charts/dashboardCharts';
import DefaultChart from '../../utility/DefaultChart';
import MostPurchased from './MostPurchased';

const MPFood = ({labels, data}) => {

    const tickCallBack = value => `$${value}`
    const tooltipCallBack = item => `Earnings: $${item.formattedValue}`

    const chartOptions = new ChartConfig(null, false, tickCallBack, tooltipCallBack);

    const chartData = new DashboardBarChart([...labels],[...data], "Earnings")

    return (
        <DefaultChart title="Highest Earning Items" masterData={data} chartData={chartData} chartOptions={chartOptions} chartFlag="bar"/>

    )
}

export default MostPurchased(MPFood, "food");
