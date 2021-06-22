import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux'
import { buildChartWithData } from '../../../utils';
import { ChartBarConfig, DashboardBarChart } from '../../../models/charts/dashboardCharts';
import DefaultBarChart from '../../utility/DefaultBarChart';

const PopularityChart = (props) => {

    const [orderFrequency, setOrderFrequency] = useState({labels: [], data: []});
    const orders = useSelector(state => state.orders);

    const buildFrequencyChart = useCallback(() => {
        return buildChartWithData({...orders}, "orders")
    }, [orders])

    useEffect(() => {
        let chartTools = buildFrequencyChart();
        setOrderFrequency({
            labels: chartTools.map(item => item[0]),
            data: chartTools.map(item => item[1])
        })
    }, [buildFrequencyChart])

    const chartOptions = new ChartBarConfig(0);
    const chartData = new DashboardBarChart([...orderFrequency.labels],[...orderFrequency.data], "Orders");

    return (
        <DefaultBarChart title="Last Weeks Orders" masterData={orderFrequency.data} chartData={chartData} chartOptions={chartOptions} />
    )
}

export default PopularityChart;
