import { ADD_INVENTORY_ITEM, EDIT_INVENTORY_ITEM, GET_INVENTORY_ITEMS, GET_INVENTORY_ITEMS_ERROR, GET_INVENTORY_ITEMS_SUCCESS, REMOVE_INVENTORY_ITEM } from "./inventoryTypes";


const initialState = {
    loading: null,
    inventory: {
        items: {},
        names: [],
        categories: {}
    },
    error: null
}

const inventoryReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_INVENTORY_ITEMS:
            return {...state, loading: true, inventory: null, error: null}
        case GET_INVENTORY_ITEMS_SUCCESS:
            return {...state, loading: false, inventory: {...state.inventory, items: action.payload.items, names: action.payload.names, categories: action.payload.categories}, error: null}
        case GET_INVENTORY_ITEMS_ERROR:
            return {...state, loading: false, inventory: null, error: action.payload}
        case ADD_INVENTORY_ITEM:
            return {
                ...state, 
                inventory: {
                    ...state.inventory,
                    items: {
                        ...state.inventory.items, 
                        [action.payload.id]: action.payload.data
                    },
                    names: [
                        ...state.inventory.names,
                        action.payload.id
                    ],
                    categories: {
                        ...state.inventory.categories,
                        [action.payload.data.category] : true
                    }
                }
            }
        case EDIT_INVENTORY_ITEM:
            return {...state, inventory: {...state.inventory, items: {...state.inventory.items, [action.payload.id]: action.payload.data}}}
        case REMOVE_INVENTORY_ITEM:
            const newState = {...state};
            delete newState.inventory.items[action.payload]
            return {
                ...newState,
                inventory: {
                    ...state.inventory,
                    names: [
                        ...newState.inventory.names.filter(id => id !== action.payload)
                    ]
                }
            }
        default:
            return {...state};
    }
}

export default inventoryReducer;