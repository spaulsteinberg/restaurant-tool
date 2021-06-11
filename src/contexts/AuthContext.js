import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

// useContext takes the context object itself. call this in component to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);

    const login = (email, password) => auth.signInWithEmailAndPassword(email, password).then(res => Promise.resolve([res.user.uid, res.user.email]))
    
    const logout = () => auth.signOut();

    const resetPassword = email => auth.sendPasswordResetEmail(email);

    /* current user will have update email and password functions for firebase updating */
    const updateEmail = email => currentUser.updateEmail(email)

    const updatePassword = password => currentUser.updatePassword(password)
    
    // create a subscription to firebase auth state change. put in useEffect to only call once (verify there is a user)
    useEffect(() => {
        const unsubscribeAuthSubscription = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribeAuthSubscription;
    }, [])

    // context value that can be destructured
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }

    // this allows the auth context provider to be used as a wrapper component, and display the site content as children
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
