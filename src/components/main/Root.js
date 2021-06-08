import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './main-styles.scss';

const Root = (props) => {

    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

    const handleLogout = async () => {
        setError('')
        try {
            await logout();
            history.push('/login');
        } catch (err) {
            setError("Failed to logout. Please try again")
        }
    } 

    return (
        <>
            <React.StrictMode>
            <div>
            Im the dash!
            <Button variant="success" className="btn" onClick={handleLogout}>Log out</Button>
            </div>
            </React.StrictMode>
        </>
    )
}

export default Root;