import { GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_ERROR } from "./orderTypes";

const initialState = {
    loading: null,
    data: null,
    error: null
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            // dont null out data or error here so that some state is still maintained if the next req is bad
            return {...state, loading: true };
        case GET_ORDERS_SUCCESS:
            return {...state, loading: false, data: action.payload, error: null};
        case GET_ORDERS_ERROR:
            return {...state, loading: false, data: null,error: action.payload}
        default:
            return state;
    }
}

export default orderReducer;