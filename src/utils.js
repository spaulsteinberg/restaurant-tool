import moment from "moment";

export const buildChartWithData = (data, dataKey="orders") => {
    let revenueData = {};
    let lastSevenInclusive = getLastSevenDays();
    for (const date of lastSevenInclusive){
        revenueData[date] = {
            revenue: 0,
            orders: 0
        }
    }
    for (let order of data.data) {
        revenueData[order.date].revenue += order.totalCost
        revenueData[order.date].orders += 1
    }
    let structureDataForChart = [];
    for (const [key, value] of Object.entries(revenueData)) {
        structureDataForChart.push([key, dataKey === "orders" ? value.orders : value.revenue])
    }
    return sortByDate(structureDataForChart).reverse();
}

export const sortByDate = array => array.sort((a, b) => new Date(b[0]) - new Date(a[0]));

const getLastSevenDays = () => {
    const today = moment();
    return [today.format('MM/DD/YYYY')].concat(Array(7).fill().map(() => today.subtract(1, 'day').format('MM/DD/YYYY')))
}