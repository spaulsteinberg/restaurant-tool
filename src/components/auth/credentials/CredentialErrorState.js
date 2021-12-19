import React from 'react'
import Alert from 'react-bootstrap/Alert';

const CredentialErrorState = ({error}) => {
    return error ? <Alert variant="danger" className="text-center">{error} Try logging out and logging in to try again.</Alert> : null
}

export default CredentialErrorState
