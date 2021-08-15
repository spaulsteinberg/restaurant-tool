import { db } from '../../firebase'
import firebase from "firebase/app";
import {
    GET_MENUS,
    GET_MENUS_SUCCESS,
    GET_MENUS_ERROR,
    EDIT_MENU_ITEM_SUCCESS,
    EDIT_MAIN_HEADER_SUCCESS,
    UPDATE_CONTEXT,
    ADD_MENU,
    ADD_MENU_SUCCESS,
    ADD_MENU_ERROR,
    DELETE_MENU,
    DELETE_MENU_SUCCESS,
    DELETE_MENU_ERROR,
    ADD_ITEM_SUCCESS
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

export const addMenu = () => {
    return {
        type: ADD_MENU
    }
}

export const addMenuSuccess = payload => {
    return {
        type: ADD_MENU_SUCCESS,
        payload: payload
    }
}

export const addMenuError = error => {
    return {
        type: ADD_MENU_ERROR,
        payload: error
    }
}

export const deleteMenu = payload => {
    return {
        type: DELETE_MENU,
        payload: payload
    }
}

export const deleteMenuSuccess = payload => {
    return {
        type: DELETE_MENU_SUCCESS,
        payload: payload
    }
}

export const deleteMenuError = error => {
    return {
        type: DELETE_MENU_ERROR,
        payload: error
    }
}

export const editItemSuccess = payload => {
    return {
        type: EDIT_MENU_ITEM_SUCCESS,
        payload: payload
    }
}

export const addItemSuccess = payload => {
    return {
        type: ADD_ITEM_SUCCESS,
        payload: payload
    }
}

export const editMainMenuSuccess = payload => {
    return {
        type: EDIT_MAIN_HEADER_SUCCESS,
        payload: payload
    }
}

export const updateContext = payload => {
    return {
        type: UPDATE_CONTEXT,
        payload: payload
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
                let menus = docs.map(doc => {
                   let snapShot = doc.data();
                   snapShot.id = doc.id;
                   return snapShot;
                });
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

export const addNewMenuSection = (name, message, isCurrent, updateId) => {
    return (dispatch) => {
        dispatch(addMenu());
        const menuObject = { menuName: name, optionalMessage: message, items: [] }
        db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
            .doc(updateId)
            .update({
                menus: firebase.firestore.FieldValue.arrayUnion(menuObject)
            })
            .then(() => dispatch(addMenuSuccess({section: menuObject, isCurrent: isCurrent})))
            .catch(() => dispatch(addMenuError("Something went wrong adding menu. Please try again.")))
    }
}

export const deleteMenuSection = (isCurrent, menuCopy, index, sectionIndex, updateId) => {
    return (dispatch) => {
        dispatch(deleteMenu(sectionIndex));
        db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
            .doc(updateId)
            .update({
                menus: menuCopy[index].menus
            })
            .then(() => dispatch(deleteMenuSuccess({isCurrent: isCurrent, current: menuCopy[index], menus: menuCopy})))
            .catch(() => dispatch(deleteMenuError("Something went wrong. Please try again.")))
    }
}