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