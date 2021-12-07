import { ADD_RESTAURANT_LINK, EDIT_RESTAURANT_DESCRIPTION, EDIT_RESTAURANT_NAME, GET_HOME_CONFIG, GET_HOME_CONFIG_ERROR, GET_HOME_CONFIG_SUCCESS } from "./homeTypes"

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOME_CONFIG:
            return { ...state, loading: true }
        case GET_HOME_CONFIG_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null }
        case GET_HOME_CONFIG_ERROR:
            return { ...state, loading: false, data: null, error: action.payload }
        case EDIT_RESTAURANT_NAME:
            return { ...state, data: { ...state.data, name: action.payload } };
        case EDIT_RESTAURANT_DESCRIPTION:
            return { ...state, data: { ...state.data, description: action.payload } }
        case ADD_RESTAURANT_LINK:
            return { ...state, data: { ...state.data, links: [...state.data.links, action.payload] } }
        default:
            return state;
    }
}

export default homeReducer