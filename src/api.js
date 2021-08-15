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

export const addMenuItemToSection = (menus, updateId) => {
    return db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
        .doc(updateId)
        .update({
            menus: menus
        })
}