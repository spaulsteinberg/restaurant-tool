import React from 'react';
import SignUp from './auth/SignUp';
import '../styles/styles.scss';
import { Container, Row } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PageNotFound from './utility/PageNotFound';
import Dashboard from './main/Dashboard';
import Login from './auth/Login';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Container fluid className="appWrapper">
            <Row className="justify-content-center">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="*" component={PageNotFound} />
              </Switch>
            </Row>
          </Container>
        </Router>
      </AuthProvider>
  )
}

export default App;
