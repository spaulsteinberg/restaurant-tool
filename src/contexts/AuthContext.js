import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

// useContext takes the context object itself. call this in component to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    
    // create a subscription to state change. put in useEffect to only call once
    useEffect(() => {
        const unsubscribeAuthSubscription = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribeAuthSubscription;
    }, [])

    const value = {
        currentUser,
        signup
    }

    // this allows the auth context provider to be used as a wrapper component, and display the site content as children
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
