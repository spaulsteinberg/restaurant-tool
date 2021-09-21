import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

const NavigationBarLinks = () => {
    return (
        <Navbar.Collapse id="collapsed-nav-items">
            <Nav className="alignTextLeft">
                <NavLink className="navLink" to="/dashboard">Dashboard</NavLink>
                <NavLink className="navLink" to="/inventory">Inventory</NavLink>
                <NavLink className="navLink" to="/orders">Orders</NavLink>
                <NavLink className="navLink" to="/menus">Menus</NavLink>
            </Nav>
        </Navbar.Collapse>
    )
}

export default NavigationBarLinks
