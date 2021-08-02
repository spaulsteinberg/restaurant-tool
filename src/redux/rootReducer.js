import {combineReducers} from 'redux';
import orderReducer from './orders/orderReducer';
import goalReducer from './goals/goalReducer';
import { menuReducer } from './menus/menuReducer';

const rootReducer = combineReducers({
    orders: orderReducer,
    goals: goalReducer,
    menus: menuReducer,
});

export default rootReducer;