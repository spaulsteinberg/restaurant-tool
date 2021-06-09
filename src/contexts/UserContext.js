import React, { useContext, useEffect, useReducer } from 'react';
import { userReducer, ADD_USER, CLEAR_USER } from '../components/reducers/userReducer';
import {db} from '../firebase'

const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, {}, () => {
        // this function returns default val.
        const localUser = localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO);
        return localUser ? JSON.parse(localUser) : {}
    })

    const clearUserDataFromLocalStorage = () => {
        userDispatch({type: CLEAR_USER})
    }
    
    const setUserDataInLocalStorage = email => {
        db.collection(process.env.REACT_APP_USER_DB_COLLECTION)
            .doc(email)
            .get()
            .then(doc => {
                if (doc.exists){
                    userDispatch({type: ADD_USER, payload: doc.data()})
                }
            })
            .catch((err) => console.log("swallow user err for now"))
    }

    useEffect(() => {
        localStorage.setItem(process.env.REACT_APP_LOCAL_USER_INFO, JSON.stringify(user))
    }, [user])

    const value = {
        clearUserDataFromLocalStorage,
        setUserDataInLocalStorage,
        userDispatch,
        user,
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}