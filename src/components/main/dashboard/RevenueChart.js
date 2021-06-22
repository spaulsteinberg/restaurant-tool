import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux'
import { buildChartWithData } from '../../../utils';
import { ChartBarConfig, DashboardBarChart } from '../../../models/charts/dashboardCharts';
import DefaultBarChart from '../../utility/DefaultBarChart';

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

    const chartOptions = new ChartBarConfig(null, tickCallBack, tooltipCallBack);
    const chartData = new DashboardBarChart([...revenue.labels], [...revenue.data], "Revenue")

    return (
        <DefaultBarChart title="My Revenue" masterData={revenue.data} chartData={chartData} chartOptions={chartOptions} />
    )
}
export default RevenueChart;