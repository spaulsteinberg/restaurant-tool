import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../../contexts/AuthContext';
import useWideView from '../../../hooks/useWideView';
import ProfileDropdown from '../profile/ProfileDropdown';
import NavigationBarLinks from './NavigationBarLinks';

const NavigationBar = (props) => {
  const {currentUser} = useAuth();
  const {wideView} = useWideView(992);

  const [collapsed, setCollapsed] = useState(false);

  const handleSetCollapsed = () => setCollapsed(prev => !prev)

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
      <Navbar bg="primary" expand="md">
        { 
        !wideView ? 
          <React.Fragment>
            <Navbar.Toggle aria-controls="collapsed-nav-items" className="mx-1" onClick={handleSetCollapsed}/>
            <NavigationBarLinks />
            <ProfileDropdown isCollapsed={collapsed} />
          </React.Fragment>
          : 
          <React.Fragment>
            <NavigationBarLinks />
            <Navbar.Toggle aria-controls="collapsed-nav-items" />
            <ProfileDropdown />
          </React.Fragment>
        }
      </Navbar>
    );

    return currentUser ? loggedInNav : notLoggedInNav;
}

export default React.memo(NavigationBar);
