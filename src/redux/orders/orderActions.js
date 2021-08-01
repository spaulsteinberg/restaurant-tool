import * as orderActions from './orderTypes';
import * as moment from 'moment-timezone';
import { db } from '../../firebase';
import { ORDER_TIMEFRAMES } from '../../constants/constants';

export const getOrders = () => {
    return {
        type: orderActions.GET_ORDERS
    }
}

export const getOrdersSuccess = orders => {
    return {
        type: orderActions.GET_ORDERS_SUCCESS,
        payload: orders
    }
}

export const getOrdersError = error => {
    return {
        type: orderActions.GET_ORDERS_ERROR,
        payload: error
    }
}

export const getAllOrders = timeframe => {
    return async (dispatch) => {
        dispatch(getOrders());
        
        const momentReqConfig = getTimeFrameForMoment(timeframe)

        await db.collection(process.env.REACT_APP_ORDER_DB_COLLECTION)
                .where("date", ">=", moment().subtract(momentReqConfig.num, momentReqConfig.window).startOf('day').toDate())
                .get()
                .then(response => response.docs.map(d => {
                    let snapShot = d.data();
                    snapShot.receiptNumber = d.id;
                    snapShot.shortDate = moment(snapShot.date.toDate()).format('MM/DD/YYYY');
                    snapShot.date = moment(snapShot.date.toDate()).format('MM/DD/YYYY HH:MM');
                    snapShot.totalCost = parseFloat(snapShot.totalCost)
                    return snapShot;
                }))
                .then(docs => dispatch(getOrdersSuccess(docs)))
                .catch(() => dispatch(getOrdersError('Error retrieving orders. Please try again later.')))
    }
}

const getTimeFrameForMoment = (timeframe) => {
    switch(timeframe){
        case ORDER_TIMEFRAMES.ONE_WEEK:
            return {
                window: "days",
                num: 7,
            }
        case ORDER_TIMEFRAMES.ONE_MONTH:
            return {
                window: "months",
                num: 1,
            }
        case ORDER_TIMEFRAMES.THREE_MONTH:
            return {
                window: "months",
                num: 3,
            }
        case ORDER_TIMEFRAMES.ONE_YEAR:
            return {
                window: "years",
                num: 1,
            }
        default:
            return {
                window: "days",
                num: 7,
            }
    }
}