import React from 'react';
import MostPurchased from './MostPurchased';
import DefaultChart from '../../utility/DefaultChart';
import { ChartConfig, DashboardBarChart } from '../../../models/charts/dashboardCharts';

const MPBeverages = ({labels, data}) => {
    const tickCallBack = value => `$${value}`
    const tooltipCallBack = item => `Earnings: $${item.formattedValue}`

    const chartOptions = new ChartConfig(null, false, tickCallBack, tooltipCallBack);

    const chartData = new DashboardBarChart([...labels],[...data], "Earnings")
    return (
        <DefaultChart title="Highest Earning Beverages" masterData={data} chartData={chartData} chartOptions={chartOptions} chartFlag="bar"/>
    )
}

export default MostPurchased(MPBeverages, "drink");
