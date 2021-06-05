import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import './main-styles.scss';

const Dashboard = () => {

    const { currentUser } = useAuth();
    const handleLogout = () => {

    } 
    return (
        <div >
            Im the dash!
            <Button variant="success" onClick={handleLogout}>Log out</Button>
            <Card className="profile-card">
                <Card.Header>
                    My Profile
                </Card.Header>
                <Card.Body>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Dashboard;
