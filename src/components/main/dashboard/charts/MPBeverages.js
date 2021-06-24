import React from 'react';
import MostPurchased from './MostPurchased';
import DefaultChart from '../../../utility/DefaultChart';
import { ChartConfig, DashboardBarChart } from '../../../../models/charts/dashboardCharts';
import { DATA_KEYS } from '../../../../constants/constants';

const MPBeverages = ({labels, data}) => {
    const tickCallBack = value => `$${value}`
    const tooltipCallBack = item => `Earnings: $${item.formattedValue}`

    const chartOptions = new ChartConfig(null, false, tickCallBack, tooltipCallBack);

    const chartData = new DashboardBarChart([...labels],[...data], "Earnings")
    return (
        <DefaultChart title="Top Beverages" masterData={data} chartData={chartData} chartOptions={chartOptions} chartFlag={DATA_KEYS.BAR}/>
    )
}

export default MostPurchased(MPBeverages, DATA_KEYS.DRINK);
