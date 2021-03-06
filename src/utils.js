import moment from "moment";
import { ORDER_TIMEFRAMES } from "./constants/constants";
import { storage } from "./firebase";

export const buildChartWithData = (data, timeframe, dataKey="orders") => {
    let revenueData = {};
    let lastXDates = getLastXDates(timeframe);
    for (const date of lastXDates){
        revenueData[date] = {
            revenue: 0,
            orders: 0
        }
    }
    for (let order of data.data) {
        //protects against unwanted data that could seep in from orders state or bad data that could crash the app
        if (!revenueData[order.shortDate]) continue;
        revenueData[order.shortDate].revenue += order.totalCost
        revenueData[order.shortDate].orders += 1
    }
    let structureDataForChart = [];
    for (const [key, value] of Object.entries(revenueData)) {
        structureDataForChart.push([key, dataKey === "orders" ? value.orders : value.revenue])
    }
    return sortByDate(structureDataForChart).reverse();
}

export const sortByDate = array => array.sort((a, b) => new Date(b[0]) - new Date(a[0]));

const getLastXDates = timeframe => {
    const today = moment();
    let numberOfDays;
    switch (timeframe) {
        case ORDER_TIMEFRAMES.ONE_WEEK: numberOfDays = 7; break;
        case ORDER_TIMEFRAMES.ONE_MONTH: numberOfDays = 30; break;
        case ORDER_TIMEFRAMES.THREE_MONTH: numberOfDays = 90; break;
        case ORDER_TIMEFRAMES.ONE_YEAR: numberOfDays = 365; break;
        default: numberOfDays = 7; break;
    }
    return [today.format('MM/DD/YYYY')].concat(Array(numberOfDays).fill().map(() => today.subtract(1, 'day').format('MM/DD/YYYY')))
}

/******Order comparators *******/
export const firstNameComparator = (a, b) => {
    if (a.firstName === b.firstName) {
        return a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0
    }
    return a.firstName > b.firstName ? 1 : -1
}

export const lastNameComparator = (a, b) => {
    if (a.lastName === b.lastName) {
        return a.firstName > b.firstName ? 1 : a.firstName < b.firstName ? -1 : 0
    }
    return a.lastName > b.lastName ? 1 : -1
}

export const dateComparator = (a, b) => {
    return new Date(b.date) - new Date(a.date)
}

export const costComparator = (a, b) => {
    return b.totalCost - a.totalCost;
}

export const getMapKeyByValue = (map, searchValue) => {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
    return null;
  }

export const validateFormItemsExist = form => {
    if (!form.item?.trim() || !form.category?.trim() || !form.price || !form.type) {
        return false;
    }
    return true;
}
export const validateDescription = description => description.trim().length > 100
export const validatePrice = price => price < 0 || isNaN(price)

export const standardizeString = str => {
    return (str[0].toUpperCase() + str.slice(1)).trim()
}

export const uploadImageFile = async (name, file, collection) => storage.ref(`${collection}/${name}`).put(file)
    .then(response => {
        return storage
            .ref(collection)
            .child(name)
            .getDownloadURL()
            .then(url => Promise.resolve(url))
    })
    .catch(err => console.log(err)) 
