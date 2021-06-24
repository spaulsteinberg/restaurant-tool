import React from 'react'
import DefaultChart from '../../../utility/DefaultChart';
import { DATA_KEYS } from '../../../../constants/constants';
import { ChartDoughnutConfig, DashboardDoughnutChart } from '../../../../models/charts/dashboardCharts';
import MostPurchased from './MostPurchased';

const MPFoodCategories = ({labels, data}) => {
  const tooltipCallBack = item => `${item.label.split('(')[0].slice(0, -1)}: ${item.formattedValue}%`
  const chartData = new DashboardDoughnutChart([...labels], [...data]);
  const options = new ChartDoughnutConfig(tooltipCallBack);
    return (
      <DefaultChart title="Food Distribution" masterData={data} chartData={chartData} chartOptions={options} chartFlag={DATA_KEYS.DOUGHNUT}/>
      )
}

export default MostPurchased(MPFoodCategories, DATA_KEYS.FOOD, true);
