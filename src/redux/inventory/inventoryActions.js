import { GET_INVENTORY_ITEMS, GET_INVENTORY_ITEMS_SUCCESS, GET_INVENTORY_ITEMS_ERROR, EDIT_INVENTORY_ITEM } from "./inventoryTypes"
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

export const fetchAllInventoryItems = () => {
    return (dispatch) => {
        dispatch(getInventoryItems());
        db.collection(process.env.REACT_APP_INVENTORY_DB_COLLECTION)
        .get()
        .then(querySnapShot => {
            if (querySnapShot){
                let snapShot = querySnapShot.docs.map(doc => {
                    let data = doc.data();
                    data.id = doc.id;
                    return data;
                })
                dispatch(getInventoryItemsSuccess(snapShot))
            }
        })
        .catch(err => {
            console.log(err)
            dispatch(getInventoryItemsError("An error occurred making the request. Please try again."))
        })
    }
}