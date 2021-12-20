import {combineReducers} from 'redux';
import orderReducer from './orders/orderReducer';
import goalReducer from './goals/goalReducer';
import { menuReducer } from './menus/menuReducer';
import inventoryReducer from './inventory/inventoryReducer';
import homeReducer from './home/homeReducer';
import userStoreReducer from './user/userReducer';
import { USER_LOGOUT } from './globalActionTypes';

const appReducer = combineReducers({
    orders: orderReducer,
    goals: goalReducer,
    menus: menuReducer,
    inventory: inventoryReducer,
    home: homeReducer,
    users: userStoreReducer,
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT){
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;