import * as TYPES from './userTypes';

const initialState = {
    loading: false,
    data: null,
    error: null
}

const userStoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_USERS:
            return { ...state, loading: true, data: null, error: null }
        case TYPES.GET_USERS_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null }
        case TYPES.GET_USERS_ERROR:
            return { ...state, loading: false, data: null, error: action.payload }
        default:
            return state;
    }
}

export default userStoreReducer;