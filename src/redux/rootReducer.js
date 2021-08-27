import {combineReducers} from 'redux';
import orderReducer from './orders/orderReducer';
import goalReducer from './goals/goalReducer';
import { menuReducer } from './menus/menuReducer';
import inventoryReducer from './inventory/inventoryReducer';

const rootReducer = combineReducers({
    orders: orderReducer,
    goals: goalReducer,
    menus: menuReducer,
    inventory: inventoryReducer,
});

export default rootReducer;