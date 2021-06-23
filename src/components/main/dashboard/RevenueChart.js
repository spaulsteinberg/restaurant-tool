import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux'
import { buildChartWithData } from '../../../utils';
import { ChartConfig, DashboardLineChart } from '../../../models/charts/dashboardCharts';
import DefaultChart from '../../utility/DefaultChart';

const RevenueChart = (props) => {
    const [revenue, setRevenue] = useState({labels: [], data: []});
    const orders = useSelector(state => state.orders);

    const buildFrequencyChart = useCallback(() => {
        return buildChartWithData({...orders}, "revenue")
    }, [orders])

    useEffect(() => {
        let chartTools = buildFrequencyChart();
        setRevenue({
            labels: chartTools.map(item => item[0]),
            data: chartTools.map(item => item[1])
        })
    }, [buildFrequencyChart])

    const tickCallBack = value => `$${value}`
    const tooltipCallBack = item => `Revenue: $${item.formattedValue}`

    const chartOptions = new ChartConfig(null, true, tickCallBack, tooltipCallBack);
    const chartData = new DashboardLineChart([...revenue.labels], [...revenue.data], "Revenue")

    return (
        <DefaultChart title="My Revenue" masterData={revenue.data} chartData={chartData} chartOptions={chartOptions} chartFlag="line"/>
    )
}
export default RevenueChart;