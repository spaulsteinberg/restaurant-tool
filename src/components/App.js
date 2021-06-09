import React from 'react';
import SignUp from './auth/SignUp';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './utility/PageNotFound';
import Login from './auth/Login';
import PrivateRoute from './utility/PrivateRoute';
import ResetPassword from './auth/ResetPassword';
import UpdateProfile from './main/profile/UpdateProfile';
import Root from './main/Root';
import NavigationBar from './main/navbar/NavigationBar';
import Dashboard from './main/content/Dashboard';
import '../styles/styles.scss';
import ViewProfile from './main/profile/ViewProfile';
import ErrorBoundary from './ErrorBoundary';
import { UserProvider } from '../contexts/UserContext';

const App = () => {
  return (
      <ErrorBoundary>
          <AuthProvider>
            <UserProvider>
              <Router>
                <NavigationBar />
                <Root>
                  <Switch>
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/profile/view" component={ViewProfile} />
                    <PrivateRoute path="/profile/update" component={UpdateProfile} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/forgot-password" component={ResetPassword} />
                    <Route exact path="*" component={PageNotFound} />
                  </Switch>
                </Root>
              </Router>
            </UserProvider>
        </AuthProvider>
      </ErrorBoundary>
  )
}

export default App;
