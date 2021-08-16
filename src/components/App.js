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
import OrderReceipt from './main/orders/OrderReceipt';
import Menu from './main/menus/Menu';
import MenuHomePage from './main/menus/MenuHomePage';

const App = () => {
  const privateRoutes = [{path: '/', component: Dashboard}, {path:"/dashboard", component:Dashboard}, {path:"/orders", component:Orders},
    {path:"/profile/view", component:ViewProfile}, {path:"/profile/update", component:UpdateCredentials}, {path:"/profile/signup", component:SignUp},
    {path: '/orders/order/:id', component:OrderReceipt}, {path:'/menus', component:MenuHomePage},{path: "/menus/view", component:Menu}];
  const publicRoutes = [{path:"/login", component:Login}, {path:"/forgot-password", component:ResetPassword}, {path:"*", component:PageNotFound}]
  return (
      <ErrorBoundary>
          <AuthProvider>
            <UserProvider>
              <Provider store={store}>
                <Router>
                  <Root>
                    <Switch>
                      {privateRoutes.map(route => <PrivateRoute key={route.path} exact path={route.path} component={route.component} />)}
                      {publicRoutes.map(route => <Route key={route.path} exact path={route.path} component={route.component} />)}
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
