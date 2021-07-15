import {combineReducers} from 'redux';
import orderReducer from './dashboard/orderReducer';
import goalReducer from './goals/goalReducer';

const rootReducer = combineReducers({
    orders: orderReducer,
    goals: goalReducer
});

export default rootReducer;