export const buildChartWithData = (data, dataKey="orders") => {
    let revenueData = {};
    for (let order of data.data) {
        // if date exists
        if (revenueData.hasOwnProperty(order.date)){
            revenueData[order.date].revenue += order.totalCost
            revenueData[order.date].orders += 1
        } else {
            revenueData[order.date] = {
                revenue: order.totalCost,
                orders: 1
            }
        }
    }
    let structureDataForChart = [];
    for (const [key, value] of Object.entries(revenueData)) {
        structureDataForChart.push([key, dataKey === "orders" ? value.orders : value.revenue])
    }
    return sortByDate(structureDataForChart).reverse();
}

export const sortByDate = array => array.sort((a, b) => new Date(b[0]) - new Date(a[0]));