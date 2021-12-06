import { db } from "../../firebase"
import { EDIT_RESTAURANT_DESCRIPTION, EDIT_RESTAURANT_NAME, GET_HOME_CONFIG, GET_HOME_CONFIG_ERROR, GET_HOME_CONFIG_SUCCESS } from "./homeTypes"

export const getHomeConfig = () => {
    return {
        type: GET_HOME_CONFIG
    }
}

export const getHomeConfigSuccess = payload => {
    return {
        type: GET_HOME_CONFIG_SUCCESS,
        payload: payload
    }
}

export const getHomeConfigError = payload => {
    return {
        type: GET_HOME_CONFIG_ERROR,
        payload: payload
    }
}

export const addRestaurantName = payload => {
    return {
        type: EDIT_RESTAURANT_NAME,
        payload: payload
    }
}

export const addRestaurantDescription = payload => {
    return {
        type: EDIT_RESTAURANT_DESCRIPTION,
        payload: payload
    }
}


export const retrieveHomeConfig = () => {
    return async (dispatch) => {
        dispatch(getHomeConfig())
        db.collection(process.env.REACT_APP_HOME_DB_COLLECTION)
        .doc(process.env.REACT_APP_HOME_MAIN_DOC)
        .get()
        .then(res => {
            dispatch(getHomeConfigSuccess(res.data()))
        })
        .catch(err => {
            console.log(err)
            dispatch(getHomeConfigError("Error loading home configuration content."))
        })
    }
}