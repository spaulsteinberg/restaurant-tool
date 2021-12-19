import { db } from '../../firebase';
import * as TYPES from './userTypes';

export const getUsers = () => {
    return {
        type: TYPES.GET_USERS
    }
}

export const getUsersSuccess = payload => {
    return {
        type: TYPES.GET_USERS_SUCCESS,
        payload: payload
    }
}

export const getUsersError = error => {
    return {
        type: TYPES.GET_USERS_ERROR,
        payload: error
    }
}

export const saveUsers = users => {
    return {
        type: TYPES.SAVE_USERS,
        payload: users
    }
}

export const getUsersRequest = (isAdmin, email) => {
    return async (dispatch) => {
        if (!isAdmin) dispatch(getUsersError("User has insufficient permissions."));
        dispatch(getUsers())
        return db.collection(process.env.REACT_APP_USER_DB_COLLECTION)
        .where("email", "!=", email)
        .get()
        .then(snapshot => {
            if (snapshot && snapshot.docs){
                dispatch(getUsersSuccess(snapshot.docs.map(s => {
                    return { id: s.id, ...s.data()}
                })))
            } else {
                dispatch(getUsersError("No users found!"))
            }
        })
        .catch(err => {
            console.log(err)
            dispatch(getUsersError("An error occurred. Please reload to try again."))
        })
    }
}