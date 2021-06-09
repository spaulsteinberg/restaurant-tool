import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Root = (props) => {

    

    return (
        <React.Fragment>
        <React.StrictMode>
          <Container fluid className="appWrapper">
            <Row>
                {props.children}
            </Row>
          </Container>
        </React.StrictMode>
        </React.Fragment>
    )
}

export default Root;