import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavigationBar from './navbar/NavigationBar';
import { useTheme } from '../../contexts/ThemeContext';


const Root = (props) => {
    const padded = useTheme();
    
    return (
        <React.Fragment>
        <NavigationBar />
        <React.StrictMode>
          <Container fluid className="appWrapper">
            <Row>
              <Col md={12} className={`padded-${padded.state.padded}`}>
                {props.children}
              </Col>
            </Row>
          </Container>
        </React.StrictMode>
        </React.Fragment>
    )
}

export default Root;