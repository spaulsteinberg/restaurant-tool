import React, { useContext, useEffect, useReducer, useState } from 'react';
import { userReducer, ADD_USER, CLEAR_USER, UPDATE_USER_EMAIL } from '../reducers/userReducer';
import {db} from '../firebase';

const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, {}, () => {
        // this function returns default val.
        const localUser = localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO);
        return localUser ? JSON.parse(localUser) : {}
    });

    const [profileError, setProfileError] = useState(false);

    const clearUserDataFromLocalStorage = () => {
        userDispatch({type: CLEAR_USER})
    }

    const userExistsInLocalStorage = () => localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO) ? true : false

    const updateUserContextEmail = (email, key) => {
        db.collection(process.env.REACT_APP_USER_DB_COLLECTION)
            .doc(key)
            .set({email: email}, {merge: true})
            .then(() => userDispatch({type: UPDATE_USER_EMAIL, payload: email}))
            .catch(err => Promise.reject(err))
    }

    const setOrCreateUserProfile = (payload, key) => {
       db.collection(process.env.REACT_APP_USER_DB_COLLECTION)
         .doc(key)
         .set(payload)
         .then(() => {
            userDispatch({type: ADD_USER, payload: payload});
            Promise.resolve();
         })
         .catch(err => Promise.reject(err))
    }
    
    const getUserCallToDispatch = (payload, email) => userDispatch({ type: ADD_USER, payload: {...payload, email} })

    const getUserFromProfile = (uid, email) => {
        setProfileError(false)
        return new Promise((resolve, reject) => {
            db.collection(process.env.REACT_APP_USER_DB_COLLECTION)
            .doc(uid)
            .get()
            .then(doc => {
                if (doc.exists){
                    getUserCallToDispatch(doc.data(), email)
                    resolve(doc.data())
                } else {
                    resolve(null)
                }
            })
            .catch((err) => reject(setProfileError(true)))
        })
    }

    useEffect(() => {
        localStorage.setItem(process.env.REACT_APP_LOCAL_USER_INFO, JSON.stringify(user))
    }, [user])

    const value = {
        clearUserDataFromLocalStorage,
        getUserCallToDispatch,
        userDispatch,
        setOrCreateUserProfile,
        updateUserContextEmail,
        userExistsInLocalStorage,
        profileError,
        getUserFromProfile,
        user,
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}