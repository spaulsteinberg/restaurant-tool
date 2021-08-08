import {
    GET_MENUS,
    GET_MENUS_SUCCESS,
    GET_MENUS_ERROR,
    EDIT_MENU_ITEM_SUCCESS,
    EDIT_MAIN_HEADER_SUCCESS,
    UPDATE_CONTEXT
} from './menuTypes'

const initialState = {
    get: {
        loading: null,
        success: null,
        error: null
    },
    add: {
        loading: null,
        success: null,
        error: null
    },
    remove: {
        loading: null,
        success: null,
        error: ''
    },
    menuList: [],
    current: null,
    context: null,
}

export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MENUS:
            return { ...state, get: { ...state.get, loading: true, success: null, error: null } }
        case GET_MENUS_SUCCESS:
            return {
                ...state,
                get: {
                    ...state.get,
                    loading: false,
                    success: true,
                    error: ''
                },
                menuList: action.payload.menus,
                current: action.payload.current
            }
        case GET_MENUS_ERROR:
            return { ...state, get: { ...state.get, loading: false, success: false, error: action.payload } }
        case EDIT_MENU_ITEM_SUCCESS:
            let menuListCopy = [...state.menuList];
            menuListCopy[action.payload.index] = action.payload.menu
            return { ...state, menuList: menuListCopy}
        case EDIT_MAIN_HEADER_SUCCESS:
            const {isCurrent, newMenu, currentMenu} = action.payload;
            return isCurrent ? {...state, menuList: newMenu, current: currentMenu} : {...state, menuList: newMenu }
        case UPDATE_CONTEXT:
            return {...state, context: {...state.context, title: action.payload.title, message: action.payload.message}}
        default:
            return state;
    }
}