import React from 'react'
import { Form, FormGroup } from 'react-bootstrap'

const SignUpPermissions = ({write, admin, handleChange}) => {
    return (
        <FormGroup className="mx-4 signup-permissions-group">
            <Form.Label className="signup-permission-label">Permissions (Optional):</Form.Label>
            <Form.Check name="write" type="checkbox" checked={write} label="Write" onChange={handleChange} inline />
            <Form.Check name="admin" type="checkbox" checked={admin} label="Admin" onChange={handleChange} inline />
        </FormGroup>
    )
}

export default SignUpPermissions
