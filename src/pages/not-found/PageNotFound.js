import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PageNotFound = () => {
    const {currentUser} = useAuth();

    return (
        <div className="justify-content-center mt-4">
            <h2>This page does not exist!</h2>
            <p>What are you looking for? Click the link to go to...</p>
            <div className="not-found-link-container">
                <ul>
                    { 
                        currentUser ?
                            <React.Fragment>
                                <li>
                                    <Link exact={`{true}`} to="/">Home/Dashboard</Link>
                                </li>
                                <li>
                                    <Link exact={`{true}`} to="/orders">Orders Page</Link>
                                </li>
                                <li>
                                    <Link exact={`{true}`} to="/profile/view">View Profile</Link>
                                </li>
                                <li>
                                    <Link exact={`{true}`} to="/profile/update">Update Credentials</Link>
                                </li>
                                <li>
                                    <Link exact={`{true}`} to="/profile/signup">Sign Up</Link>
                                </li>
                                <li>
                                    <Link exact={`{true}`} to="/menus">Menu Page</Link>
                                </li>
                                <li>
                                    <Link exact={`{true}`} to="/inventory">Inventory Page</Link>
                                </li>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <li>
                                    <Link exact={`{true}`} to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link exact={`{true}`} to="/forgot-password">Forgot Password</Link>
                                </li>
                            </React.Fragment>
                    }
                </ul>
            </div>
        </div>
    )
}

export default PageNotFound;
