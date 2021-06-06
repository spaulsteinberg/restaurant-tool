import React from 'react';
import SignUp from './auth/SignUp';
import '../styles/styles.scss';
import { Container, Row } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PageNotFound from './utility/PageNotFound';
import Dashboard from './main/Dashboard';
import Login from './auth/Login';
import PrivateRoute from './utility/PrivateRoute';
import ResetPassword from './auth/ResetPassword';
import UpdateProfile from './main/profile/UpdateProfile';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Container fluid className="appWrapper">
            <Row className="justify-content-center">
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgot-password" component={ResetPassword} />
                <Route path="/update/profile" component={UpdateProfile} />
                <Route exact path="*" component={PageNotFound} />
              </Switch>
            </Row>
          </Container>
        </Router>
      </AuthProvider>
  )
}

export default App;
