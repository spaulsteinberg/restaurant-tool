// file for standalone api calls
import { db } from "./firebase"

export const updateMenuItem = (menuCopy, updateId) => {
    return db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
        .doc(updateId)// set to update id
        .update({
            menus: menuCopy.menus
        })
}

export const updateMainMenuTitleAndDescription = (name, message, updateId) => {
    return db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
        .doc(updateId)
        .update({
            name: name,
            optionalMessage: message
        })
}

export const updateMenuItemsInSection = (menus, updateId) => {
    return db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
        .doc(updateId)
        .update({
            menus: menus
        })
}

export const updateCurrentMenu = (updateIdOld, updateIdNew) => {
    let batch = db.batch();

    if (updateIdOld){
        let updateOldRef = db.collection(process.env.REACT_APP_MENU_DB_COLLECTION).doc(updateIdOld);
        batch.update(updateOldRef, {"current": false});
    }
    
    let updateNewRef = db.collection(process.env.REACT_APP_MENU_DB_COLLECTION).doc(updateIdNew);
    batch.update(updateNewRef, {"current": true});

    return batch.commit();
}

export const addMainMenuToMenuList = (name, description, current = false, menus = []) => {
    // add an empty array of menus as well
    // get a returned id
    return db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
        .add({
            name: name,
            optionalMessage: description,
            current: current,
            menus: menus
        })
}

export const editInventoryItemReq = (id, count, cost) => {
    return db.collection(process.env.REACT_APP_INVENTORY_DB_COLLECTION)
        .doc(id)
        .update({
            count: count,
            cost: cost
        })
}

export const removeInventoryItemReq = id => {
    return db.collection(process.env.REACT_APP_INVENTORY_DB_COLLECTION)
    .doc(id)
    .delete()
}

export const addInventoryItemReq = item => {
    return db.collection(process.env.REACT_APP_INVENTORY_DB_COLLECTION)
        .add(item)
}

export const editRestaurantName = newName => {
    return db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
    .doc(process.env.REACT_APP_HOME_MAIN_DOC)
    .update({
        name: newName
    })
}

export const editRestaurantDescription = newDescription => {
    return db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
    .doc(process.env.REACT_APP_HOME_MAIN_DOC)
    .update({
        description: newDescription
    })
}