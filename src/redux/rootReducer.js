import {combineReducers} from 'redux';
import orderReducer from './orders/orderReducer';
import goalReducer from './goals/goalReducer';

const rootReducer = combineReducers({
    orders: orderReducer,
    goals: goalReducer
});

export default rootReducer;