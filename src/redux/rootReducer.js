import {combineReducers} from 'redux';
import orderReducer from './dashboard/orderReducer';

const rootReducer = combineReducers({
    orders: orderReducer
});

export default rootReducer;