import React, { useEffect, useState } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import '../../main/main-styles.scss';
import Profile from '../profile/Profile';

const NavigationBar = () => {
  const {currentUser} = useAuth();
  const [showProfileIcon, setShowProfileIcon] = useState(true);

  /*
useEffect(() => {
  window.addEventListener('mousemove', () => {});

  // returned function will be called on component unmount 
  return () => {
    window.removeEventListener('mousemove', () => {})
  }
}, [])
  */

  useEffect(() => {
    let widthCheck = null;
    widthCheck = window.matchMedia("(min-width: 992px)").addEventListener("change", shouldMoveItems, true);

    return () => {
      if (widthCheck) this.widthCheck.removeEventListener("change", shouldMoveItems, true)
    }
  }, [])

  const shouldMoveItems = e => {
      if (e.matches) {
          setShowProfileIcon(true)
      } else {
         setShowProfileIcon(false)
      }
  }



    const notLoggedInNav = (
      <Navbar bg="primary" expand="lg" ref={(nodeExists) => {
        if (nodeExists) {
          nodeExists.style.setProperty("justify-content", "center", "important")
        }
      }}>
        <Navbar.Brand>Admin Tool</Navbar.Brand>
      </Navbar>
    );
    const loggedInNav = (
      <Navbar bg="primary" expand="lg" ref={(nodeExists) => {
        if (nodeExists){
          nodeExists.style.setProperty("justify-content", "inherit")
        }
      }}>
        { 
        !showProfileIcon ? 
          <React.Fragment>
            <Navbar.Toggle aria-controls="collapsed-nav-items" />
            <Navbar.Brand>Admin Tool</Navbar.Brand>
            <Profile />
            <Navbar.Collapse id="collapsed-nav-items">
              <Nav className="alignTextLeft">
                <NavLink className="navLink" to="/dashboard">Dashboard</NavLink>
                <NavLink className="navLink" to="/profile">Profile</NavLink>
              </Nav>
            </Navbar.Collapse>
          </React.Fragment>
          : 
          <React.Fragment>
            <Navbar.Collapse id="collapsed-nav-items">
              <Nav className="alignTextLeft">
                <NavLink className="navLink" to="/dashboard">Dashboard</NavLink>
                <NavLink className="navLink" to="/profile">Profile</NavLink>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="collapsed-nav-items" />
        <Navbar.Brand>Admin Tool</Navbar.Brand>
        <Profile />
          </React.Fragment>
        }
      </Navbar>
    );

    return currentUser ? loggedInNav : notLoggedInNav;
}

export default React.memo(NavigationBar);
