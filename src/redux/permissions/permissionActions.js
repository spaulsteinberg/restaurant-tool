import * as TYPES from './PermissionTypes'
import { getPermissionsFromUserObject } from '../../api/userApi'

export const getPermissions = () => {
    return {
        type: TYPES.GET_PERMISSIONS
    }
}

export const getPermissionsSuccess = payload => {
    return {
        type: TYPES.GET_PERMISSIONS_SUCCESS,
        payload: payload
    }
}

export const getPermissionsError = error => {
    return {
        type: TYPES.GET_PERMISSIONS_ERROR,
        payload: error
    }
}

export const setPermissionsEmail = payload => {
    return {
        type: TYPES.SET_PERMISSION_EMAIL,
        payload: payload
    }
}

export const fetchUserPermissions = (uid, email) => {
    return async (dispatch) => {
        dispatch(getPermissions())
        getPermissionsFromUserObject(uid)
            .then(doc => {
                if (doc.exists){
                   const { roles } = doc.data()
                   dispatch(getPermissionsSuccess({roles: roles, email: email}))
                } else {
                    console.error("User does not have permissions. Please contact your administrator.")
                    dispatch(getPermissionsError("Error fetching permissions."))
                }
            })
            .catch(err => {
                console.error("Error loading permissions. Please contact your administrator.")
                dispatch(getPermissionsError("Error fetching permissions."))
            })
    }
}