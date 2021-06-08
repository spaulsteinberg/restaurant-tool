import React from 'react';
import SignUp from './auth/SignUp';
import '../styles/styles.scss';
import { Container, Row } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import PageNotFound from './utility/PageNotFound';
import Login from './auth/Login';
import PrivateRoute from './utility/PrivateRoute';
import ResetPassword from './auth/ResetPassword';
import UpdateProfile from './main/profile/UpdateProfile';
import Root from './main/Root';
import NavigationBar from './main/navbar/NavigationBar';

const App = () => {
  return (
      <AuthProvider>
        <Router>
        <NavigationBar />
          <Container fluid className="appWrapper">
            <Row>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
                <PrivateRoute exact path="/dashboard" component={Root} />
                <PrivateRoute path="/profile/update" component={UpdateProfile} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgot-password" component={ResetPassword} />
                <Route exact path="*" component={PageNotFound} />
              </Switch>
            </Row>
          </Container>
        </Router>
      </AuthProvider>
  )
}

export default App;
