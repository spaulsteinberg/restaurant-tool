import React from 'react';
import SignUp from './auth/SignUp';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './utility/PageNotFound';
import Login from './auth/Login';
import PrivateRoute from './utility/PrivateRoute';
import ResetPassword from './auth/ResetPassword';
import UpdateCredentials from './main/profile/UpdateCredentials';
import Root from './main/Root';
import Dashboard from './main/dashboard/Dashboard';
import '../styles/styles.scss';
import ViewProfile from './main/profile/ViewProfile';
import ErrorBoundary from './ErrorBoundary';
import { UserProvider } from '../contexts/UserContext';
import {Provider} from 'react-redux';
import store from '../redux/store';
import Orders from './main/orders/Orders';

const App = () => {
  return (
      <ErrorBoundary>
          <AuthProvider>
            <UserProvider>
              <Provider store={store}>
                <Router>
                  <Root>
                    <Switch>
                      <PrivateRoute exact path="/" component={Dashboard} />
                      <PrivateRoute exact path="/dashboard" component={Dashboard} />
                      <PrivateRoute exact path="/orders" component={Orders} />
                      <PrivateRoute exact path="/profile/view" component={ViewProfile} />
                      <PrivateRoute path="/profile/update" component={UpdateCredentials} />
                      <Route exact path="/signup" component={SignUp} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/forgot-password" component={ResetPassword} />
                      <Route exact path="*" component={PageNotFound} />
                    </Switch>
                  </Root>
                </Router>
              </Provider>
            </UserProvider>
        </AuthProvider>
      </ErrorBoundary>
  )
}

export default App;
