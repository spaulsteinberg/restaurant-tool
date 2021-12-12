import { db } from "../../firebase"
import * as TYPES from "./homeTypes"

export const getHomeConfig = () => {
    return {
        type: TYPES.GET_HOME_CONFIG
    }
}

export const getHomeConfigSuccess = payload => {
    return {
        type: TYPES.GET_HOME_CONFIG_SUCCESS,
        payload: payload
    }
}

export const getHomeConfigError = payload => {
    return {
        type: TYPES.GET_HOME_CONFIG_ERROR,
        payload: payload
    }
}

export const editRestaurantNameAct = payload => {
    return {
        type: TYPES.EDIT_RESTAURANT_NAME,
        payload: payload
    }
}

export const editRestaurantDescriptionAct = payload => {
    return {
        type: TYPES.EDIT_RESTAURANT_DESCRIPTION,
        payload: payload
    }
}

export const addRestaurantLinkAct = payload => {
    return {
        type: TYPES.ADD_RESTAURANT_LINK,
        payload: payload
    }
}

export const removeRestaurantLinkAct = payload => {
    return {
        type: TYPES.REMOVE_RESTAURANT_LINK,
        payload: payload
    }
}

export const updateHomePhotoAct = payload => {
    return {
        type: TYPES.UPDATE_HOME_PHOTO,
        payload: payload
    }
}

export const addGotoLinkAct = payload => {
    return {
        type: TYPES.ADD_GOTO_LINK,
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