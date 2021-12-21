import React from 'react'
import Alert from 'react-bootstrap/Alert';

const AuthErrorState = ({error, margin = ""}) => error && <Alert variant="danger" className={`text-center ${margin}`}>{error}</Alert>

export default AuthErrorState
