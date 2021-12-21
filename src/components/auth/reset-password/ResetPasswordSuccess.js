import React from 'react'
import Alert from 'react-bootstrap/Alert';

const ResetPasswordSuccess = ({success}) => success && <Alert variant="success" className="text-center">{success}</Alert>

export default ResetPasswordSuccess
