import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './main-styles.scss';

const Dashboard = (props) => {

    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory()

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
            <div>
            Im the dash!
            <Button variant="success" className="btn" onClick={handleLogout}>Log out</Button>
            </div>
            <Card className="profile-card">
                <Card.Header>
                    My Profile
                </Card.Header>
                <Card.Body>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    <Link exact={`${true}`} to="/update/profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                    {error ?? <Alert variant="danger" className="text-center">{error}</Alert>}
                </Card.Body>
            </Card>
        </>
    )
}

export default Dashboard;
