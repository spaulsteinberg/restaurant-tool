// file for standalone api calls
import { db } from "../firebase"

const editInventoryItemReq = (id, count, cost) => {
    return db.collection(process.env.REACT_APP_INVENTORY_DB_COLLECTION)
        .doc(id)
        .update({
            count: count,
            cost: cost
        })
}

const removeInventoryItemReq = id => {
    return db.collection(process.env.REACT_APP_INVENTORY_DB_COLLECTION)
        .doc(id)
        .delete()
}

const addInventoryItemReq = item => {
    return db.collection(process.env.REACT_APP_INVENTORY_DB_COLLECTION)
        .add(item)
}

export { editInventoryItemReq, removeInventoryItemReq, addInventoryItemReq }