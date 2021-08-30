import { EDIT_INVENTORY_ITEM, GET_INVENTORY_ITEMS, GET_INVENTORY_ITEMS_ERROR, GET_INVENTORY_ITEMS_SUCCESS } from "./inventoryTypes";


const initialState = {
    loading: null,
    inventory: {
        items: {},
        names: []
    },
    error: null
}

const inventoryReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_INVENTORY_ITEMS:
            return {...state, loading: true, inventory: null, error: null}
        case GET_INVENTORY_ITEMS_SUCCESS:
            return {...state, loading: false, inventory: {...state.inventory, items: action.payload.items, names: action.payload.names}, error: null}
        case GET_INVENTORY_ITEMS_ERROR:
            return {...state, loading: false, inventory: null, error: action.payload}
        case EDIT_INVENTORY_ITEM:
            return {...state, inventory: {...state.inventory, items: {...state.inventory.items, [action.payload.id]: action.payload.data}}}
        default:
            return {...state};
    }
}

export default inventoryReducer;