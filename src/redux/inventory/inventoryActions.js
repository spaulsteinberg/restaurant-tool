import { GET_INVENTORY_ITEMS, GET_INVENTORY_ITEMS_SUCCESS, GET_INVENTORY_ITEMS_ERROR, EDIT_INVENTORY_ITEM, REMOVE_INVENTORY_ITEM } from "./inventoryTypes"
import { db } from "../../firebase"

export const getInventoryItems = () => {
    return {
        type: GET_INVENTORY_ITEMS
    }
}

export const getInventoryItemsSuccess = payload => {
    return {
        type: GET_INVENTORY_ITEMS_SUCCESS,
        payload: payload
    }
}

export const getInventoryItemsError = error => {
    return {
        type: GET_INVENTORY_ITEMS_ERROR,
        payload: error
    }
}

export const editInventoryItem = payload => {
    return {
        type: EDIT_INVENTORY_ITEM,
        payload: payload
    }
}

export const removeInventoryItem = id => {
    return {
        type: REMOVE_INVENTORY_ITEM,
        payload: id
    }
}

export const fetchAllInventoryItems = () => {
    return (dispatch) => {
        dispatch(getInventoryItems());
        db.collection(process.env.REACT_APP_INVENTORY_DB_COLLECTION)
        .get()
        .then(querySnapShot => {
            if (querySnapShot){
                const stateObj = {}
                const names = []
                querySnapShot.docs.forEach(doc => {
                    let data = doc.data();
                    stateObj[data.consumable] = {...data, id: doc.id}
                    names.push(data.consumable)
                })
                dispatch(getInventoryItemsSuccess({items: stateObj, names: names}))
            }
        })
        .catch(err => {
            dispatch(getInventoryItemsError("An error occurred making the request. Please try again."))
        })
    }
}