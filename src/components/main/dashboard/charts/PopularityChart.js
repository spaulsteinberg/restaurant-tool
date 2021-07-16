import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux'
import { buildChartWithData } from '../../../../utils';
import { ChartConfig, DashboardLineChart } from '../../../../models/charts/dashboardCharts';
import DefaultChart from '../../../utility/DefaultChart';
import { DATA_KEYS } from '../../../../constants/constants';

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

    const chartOptions = new ChartConfig(0, true);
    const chartData = new DashboardLineChart([...orderFrequency.labels],[...orderFrequency.data], "Orders");

    return (
            <DefaultChart title="My Orders" masterData={orderFrequency.data} chartData={chartData} chartOptions={chartOptions} chartFlag={DATA_KEYS.LINE}/>
    )
}

export default PopularityChart;
