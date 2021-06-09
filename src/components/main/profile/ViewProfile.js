import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import {db} from '../../../firebase';
import LoadingSpinner from '../../utility/LoadingSpinner';

const ViewProfile = () => {
    const {currentUser} = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    /*************TODO: set up redux for state ******************/
    const getUser = useCallback(() => {
        setLoading(true)
        db.collection(process.env.REACT_APP_USER_DB_COLLECTION)
            .doc(currentUser.email)
            .get()
            .then(doc => {
                if (doc.exists){
                    console.log(doc.data())
                    setUser({...doc.data()})
                }
                else {
                    setError("Could not retrieve profile!")
                }
            })
            .catch(err => setError("An error occurred! Try again."))
            .finally(() => setLoading(false))
    }, [currentUser.email])
    useEffect(() => {
        getUser()
    }, [getUser])
    return (
        <div>
            {loading && <LoadingSpinner alignment="center">Loading Profile...</LoadingSpinner>}
            { user && 
                <React.Fragment>
                <label>Email: {currentUser.email}</label>
                <p>First Name: {user && user.FirstName}</p>
                <p>Last Name: {user && user.LastName}</p>
                <p>Restaurant: {user && user.Restaurant}</p>
                <p>Role: {user && user.Role}</p>
                </React.Fragment>}
            { error && <p>{error}</p>}
        </div>
    )
}

export default ViewProfile;
