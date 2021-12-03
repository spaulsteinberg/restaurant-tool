import React from 'react'
import { Redirect, Route } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import useRoles from '../../hooks/useRoles'
import LoadingSpinner from './LoadingSpinner';

const PrivateAdminRoute = ({component: Component, ...rest}) => {
    const roles = useRoles();
    const { currentUser } = useAuth();
    const spinnerComponent = <LoadingSpinner marginTop="2rem">If you are not redirected in a few moments please contact your administrator</LoadingSpinner>
    const altComponent = currentUser ? spinnerComponent : <Redirect to="/" />
    return (
        <Route {...rest} render={props => currentUser && roles?.admin ? <Component {...props} /> : altComponent } />
    )
}

export default PrivateAdminRoute
