import * as TYPES from "./homeTypes"

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_HOME_CONFIG:
            return { ...state, loading: true }
        case TYPES.GET_HOME_CONFIG_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null }
        case TYPES.GET_HOME_CONFIG_ERROR:
            return { ...state, loading: false, data: null, error: action.payload }
        case TYPES.EDIT_RESTAURANT_NAME:
            return { ...state, data: { ...state.data, name: action.payload } };
        case TYPES.EDIT_RESTAURANT_DESCRIPTION:
            return { ...state, data: { ...state.data, description: action.payload } }
        case TYPES.ADD_RESTAURANT_LINK:
            return { ...state, data: { ...state.data, links: [...state.data.links, action.payload] } }
        case TYPES.REMOVE_RESTAURANT_LINK:
            return { ...state, data: { ...state.data, links: action.payload } }
        case TYPES.UPDATE_HOME_PHOTO:
            return { ...state, data: { ...state.data, bpAddress: action.payload } }
        default:
            return state;
    }
}

export default homeReducer