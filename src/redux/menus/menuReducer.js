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
        error: null,
        target: null, // to narrow where error and loading bars are shown
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
        case ADD_MENU:
            return { ...state, add: { ...state.add, loading: true, success: null, error: null } }
        case ADD_MENU_SUCCESS:
            let mainIndex = [...state.menuList].findIndex(menu => menu.name === state.context.title)
            let updatedMenu = [...state.menuList];
            updatedMenu[mainIndex].menus.push(action.payload.section);
            if (action.payload.isCurrent) {
                return { ...state, menuList: updatedMenu, current: updatedMenu[mainIndex], add: { ...state.add, loading: false, success: true, error: null } }
            }
            return { ...state, menuList: updatedMenu, add: { ...state.add, loading: false, success: true, error: null } }
        case ADD_MENU_ERROR:
            return { ...state, add: { ...state.add, loading: false, success: false, error: action.payload } }
        case DELETE_MENU:
            return { ...state, remove: { ...state.remove, loading: true, success: null, error: null, target: action.payload } }
        case DELETE_MENU_SUCCESS:
            if (action.payload.isCurrent) {
                return { ...state, menuList: action.payload.menus, current: action.payload.current, remove: { ...state.remove, loading: false, success: true, error: null, } }
            }
            return { ...state, menuList: action.payload.menus, remove: { ...state.remove, loading: false, success: true, error: null } }
        case DELETE_MENU_ERROR:
            return { ...state, remove: { ...state.remove, loading: false, success: null, error: action.payload } }
        case EDIT_MENU_ITEM_SUCCESS:
            let menuListCopy = [...state.menuList];
            menuListCopy[action.payload.index] = action.payload.menu
            return { ...state, menuList: menuListCopy }
        case ADD_ITEM_SUCCESS:
            const {index, list} = action.payload
            return action.payload.isCurrent ? {...state, menuList: list, current: list[index]} : {...state, menuList: list}
        case EDIT_MAIN_HEADER_SUCCESS:
            const { isCurrent, newMenu, currentMenu } = action.payload;
            return isCurrent ? { ...state, menuList: newMenu, current: currentMenu } : { ...state, menuList: newMenu }
        case UPDATE_CONTEXT:
            return { ...state, context: { ...state.context, title: action.payload.title, message: action.payload.message } }
        default:
            return state;
    }
}