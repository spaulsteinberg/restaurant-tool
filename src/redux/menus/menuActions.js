import { db } from '../../firebase'
import {
    GET_MENUS,
    GET_MENUS_SUCCESS,
    GET_MENUS_ERROR
} from './menuTypes'

export const loadMenus = () => {
    return {
        type: GET_MENUS
    }
}

export const loadMenusSuccess = payload => {
    return {
        type: GET_MENUS_SUCCESS,
        payload: payload
    }
}

export const loadMenusError = error => {
    return {
        type: GET_MENUS_ERROR,
        payload: error,
    }
}

export const loadAllMenus = () => {
    return (dispatch) => {
        dispatch(loadMenus())
        db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
        .get()
        .then(response => response.docs)
        .then(docs => {
            if (docs) {
                let menus = docs.map(doc => doc.data());
                let current = menus.find(menu => menu.current === true);
                dispatch(loadMenusSuccess({menus: menus, current: current}));
            }
            else {
                dispatch(loadMenusSuccess({menus: [], current: null}))
            }
        })
        .catch(err => {
            dispatch(loadMenusError('Could not load menus. Please try again'))
        })
    }
}