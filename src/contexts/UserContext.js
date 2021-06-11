import React, { useContext, useEffect, useReducer, useState } from 'react';
import { userReducer, ADD_USER, CLEAR_USER, UPDATE_USER_EMAIL } from '../components/reducers/userReducer';
import {db} from '../firebase'

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

    const updateUserContextEmail = email => userDispatch({type: UPDATE_USER_EMAIL, payload: email})

    const setOrCreateUserProfile = (payload, email) => {
       db.collection(process.env.REACT_APP_USER_DB_COLLECTION)
         .doc(email)
         .set(payload)
         .then(() => {
            userDispatch({type: ADD_USER, payload: payload});
            Promise.resolve();
         })
         .catch(err => Promise.reject(err))
    }
    
    const setUserDataInLocalStorage = email => {
        console.log("GET USER VIA EMAIL", email)
        setProfileError(false)
        db.collection(process.env.REACT_APP_USER_DB_COLLECTION)
            .doc(email)
            .get()
            .then(doc => {
                if (doc.exists){
                    userDispatch({type: ADD_USER, payload: {email, ...doc.data()}})
                }
            })
            .catch((err) => setProfileError(true))
    }

    useEffect(() => {
        localStorage.setItem(process.env.REACT_APP_LOCAL_USER_INFO, JSON.stringify(user))
    }, [user])

    const value = {
        clearUserDataFromLocalStorage,
        setUserDataInLocalStorage,
        userDispatch,
        setOrCreateUserProfile,
        updateUserContextEmail,
        profileError,
        user,
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}