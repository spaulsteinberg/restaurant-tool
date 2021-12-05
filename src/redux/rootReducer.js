import {combineReducers} from 'redux';
import orderReducer from './orders/orderReducer';
import goalReducer from './goals/goalReducer';
import { menuReducer } from './menus/menuReducer';
import inventoryReducer from './inventory/inventoryReducer';
import homeReducer from './home/homeReducer';

const rootReducer = combineReducers({
    orders: orderReducer,
    goals: goalReducer,
    menus: menuReducer,
    inventory: inventoryReducer,
    home: homeReducer,
});

export default rootReducer;