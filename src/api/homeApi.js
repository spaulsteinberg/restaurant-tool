// file for standalone api calls
import { db } from "../firebase"
import firebase from "firebase/app";

const editRestaurantName = newName => {
    return db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
        .doc(process.env.REACT_APP_HOME_MAIN_DOC)
        .update({
            name: newName
        })
}

const editRestaurantDescription = newDescription => {
    return db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
        .doc(process.env.REACT_APP_HOME_MAIN_DOC)
        .update({
            description: newDescription
        })
}

const addRestaurantLink = newLink => {
    return db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
        .doc(process.env.REACT_APP_HOME_MAIN_DOC)
        .update({
            links: firebase.firestore.FieldValue.arrayUnion(newLink)
        })
}

const removeRestaurantLink = newLinksArray => {
    return db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
        .doc(process.env.REACT_APP_HOME_MAIN_DOC)
        .update({ links: newLinksArray })
}

const updateHomePhoto = newPhoto => {
    return db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
        .doc(process.env.REACT_APP_HOME_MAIN_DOC)
        .update({ bpAddress: newPhoto })
}

const addGotoLink = newLink => {
    return db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
        .doc(process.env.REACT_APP_HOME_MAIN_DOC)
        .update({
            gotos: firebase.firestore.FieldValue.arrayUnion(newLink)
        })
}

const editGotoLink = editedGotos => {
    return db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
        .doc(process.env.REACT_APP_HOME_MAIN_DOC)
        .update({
            gotos: editedGotos
        })
}

export { 
    editRestaurantName,
    editRestaurantDescription,
    addRestaurantLink,
    removeRestaurantLink,
    updateHomePhoto,
    addGotoLink,
    editGotoLink
}