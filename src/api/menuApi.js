import { db } from "../firebase"

const updateMenuItem = (menuCopy, updateId) => {
    return db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
        .doc(updateId)// set to update id
        .update({
            menus: menuCopy.menus
        })
}

const updateMainMenuTitleAndDescription = (name, message, updateId) => {
    return db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
        .doc(updateId)
        .update({
            name: name,
            optionalMessage: message
        })
}

const updateMenuItemsInSection = (menus, updateId) => {
    return db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
        .doc(updateId)
        .update({
            menus: menus
        })
}

const updateCurrentMenu = (updateIdOld, updateIdNew) => {
    let batch = db.batch();

    if (updateIdOld) {
        let updateOldRef = db.collection(process.env.REACT_APP_MENU_DB_COLLECTION).doc(updateIdOld);
        batch.update(updateOldRef, { "current": false });
    }

    let updateNewRef = db.collection(process.env.REACT_APP_MENU_DB_COLLECTION).doc(updateIdNew);
    batch.update(updateNewRef, { "current": true });

    return batch.commit();
}

const addMainMenuToMenuList = (name, description, current = false, menus = []) => {
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

export { updateMenuItem, addMainMenuToMenuList, updateCurrentMenu, updateMenuItemsInSection, updateMainMenuTitleAndDescription }