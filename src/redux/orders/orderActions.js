import * as orderActions from './orderTypes';
import { db } from '../../firebase';

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

export const getAllOrders = () => {
    return async (dispatch) => {
        dispatch(getOrders());
        await db.collection(process.env.REACT_APP_ORDER_DB_COLLECTION)
                .get()
                .then(response => response.docs.map(d => {
                    let snapShot = d.data();
                    snapShot.date = snapShot.date.toDate();
                    return snapShot;
                }))
                .then(docs => dispatch(getOrdersSuccess(docs)))
                .catch(err => dispatch(getOrdersError('Error retrieving orders. Please try again later.')))
    }
}