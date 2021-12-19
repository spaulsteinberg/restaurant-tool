import React from 'react'
import Alert from 'react-bootstrap/Alert';

const SignUpError = ({error}) => error && <Alert variant="danger" className="text-center mx-4">{error}</Alert>

export default SignUpError
