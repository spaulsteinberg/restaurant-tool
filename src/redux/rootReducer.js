import {combineReducers} from 'redux';
import orderReducer from './orders/orderReducer';

const rootReducer = combineReducers({
    orders: orderReducer
});

export default rootReducer;