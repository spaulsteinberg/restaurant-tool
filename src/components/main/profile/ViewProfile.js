import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserContext } from '../../../contexts/UserContext';

const ViewProfile = () => {
    const {currentUser} = useAuth();
    const {user} = useUserContext();
    return (
        <div className="col-4 p-5 offset-4">
            { Object.keys(user).length !== 0 ?
                <React.Fragment>
                <label>Email: {currentUser.email}</label>
                <p>First Name: {user && user.FirstName}</p>
                <p>Last Name: {user && user.LastName}</p>
                <p>Restaurant: {user && user.Restaurant}</p>
                <p>Role: {user && user.Role}</p>
                </React.Fragment>
                :
                <div className="justify-content-center">
                    <label>Email: {currentUser.email}</label>
                    <p className="text-danger">Could not load your full profile. Please try again later.</p>
                </div>
            }
        </div>
    )
}

export default ViewProfile;
