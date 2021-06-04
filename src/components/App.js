import React from 'react';
import SignUp from './auth/SignUp';
import '../styles/styles.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';

const App = () => {
  return (
      <AuthProvider>
        <Container fluid className="appWrapper">
          <Row className="justify-content-center">
            <Col sm={12} lg={4} xs={12} md={8}>
              <SignUp />
            </Col>
          </Row>
        </Container>
      </AuthProvider>
  )
}

export default App;
