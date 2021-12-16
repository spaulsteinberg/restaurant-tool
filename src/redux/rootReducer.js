import {combineReducers} from 'redux';
import orderReducer from './orders/orderReducer';
import goalReducer from './goals/goalReducer';
import { menuReducer } from './menus/menuReducer';
import inventoryReducer from './inventory/inventoryReducer';
import homeReducer from './home/homeReducer';
import userStoreReducer from './user/userReducer';

const rootReducer = combineReducers({
    orders: orderReducer,
    goals: goalReducer,
    menus: menuReducer,
    inventory: inventoryReducer,
    home: homeReducer,
    users: userStoreReducer,
});

export default rootReducer;