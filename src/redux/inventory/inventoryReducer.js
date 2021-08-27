import { GET_INVENTORY_ITEMS, GET_INVENTORY_ITEMS_ERROR, GET_INVENTORY_ITEMS_SUCCESS } from "./inventoryTypes";


const initialState = {
    loading: null,
    inventoryList: null,
    error: null
}

const inventoryReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_INVENTORY_ITEMS:
            return {...state, loading: true, inventoryList: null, error: null}
        case GET_INVENTORY_ITEMS_SUCCESS:
            return {...state, loading: false, inventoryList: action.payload, error: null}
        case GET_INVENTORY_ITEMS_ERROR:
            return {...state, loading: false, inventoryList: null, error: action.payload}
        default:
            return {...state};
    }
}

export default inventoryReducer;