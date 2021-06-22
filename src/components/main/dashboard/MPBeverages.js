import React from 'react';
import MostPurchased from './MostPurchased';
import DefaultBarChart from '../../utility/DefaultBarChart';
import { ChartBarConfig, DashboardBarChart } from '../../../models/charts/dashboardCharts';

const MPBeverages = ({labels, data}) => {
    const tickCallBack = value => `$${value}`
    const tooltipCallBack = item => `Earnings: $${item.formattedValue}`

    const chartOptions = new ChartBarConfig(null, tickCallBack, tooltipCallBack);

    const chartData = new DashboardBarChart([...labels],[...data], "Earnings")
    return (
        <DefaultBarChart title="Highest Earning Beverages" masterData={data} chartData={chartData} chartOptions={chartOptions} />
    )
}

export default MostPurchased(MPBeverages, "drink");
