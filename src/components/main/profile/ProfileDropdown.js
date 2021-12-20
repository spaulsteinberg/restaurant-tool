import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserContext } from '../../../contexts/UserContext';
import { userLogout } from '../../../redux/globalActionTypes';

const ProfileDropdown = ({isCollapsed}) => {

    const { logout } = useAuth();
    const { clearUserDataFromLocalStorage } = useUserContext();
    const [error, setError] = useState("");
    const history = useHistory();
    const dispatch = useDispatch()

    const handleLogout = async () => {
        setError('')
        try {
            await logout();
            dispatch(userLogout())
            clearUserDataFromLocalStorage();
            history.push('/login');
        } catch (err) {
            setError("Failed to logout. Please try again")
            error && alert("Could not log you out. Please try again later.")
        }
    } 

    // add a props "show" to show either the icon or text
    // on click dropdown with options
    return (
        <Dropdown style={{margin: isCollapsed ? "0 auto" : 0}}>
            <Dropdown.Toggle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="gradient-profile" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownMenu">
                <Dropdown.Item className="navLinkDropdown" as={Link} to="/profile/update">Update Credentials</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2" className="navLinkDropdown" as={Link} to="/profile/view">View Profile</Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default React.memo(ProfileDropdown);
