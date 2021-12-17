import React from 'react'
import { FormGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const CheckboxSetPermissions = ({permissions, indx, handleCheck}) => {
    return (
        <FormGroup>
            <Form.Check name="write" type="checkbox" checked={permissions.write} label="Write" onChange={e => handleCheck(e, indx)} inline />
            <Form.Check name="admin" type="checkbox" checked={permissions.admin} label="Admin" onChange={e => handleCheck(e, indx)} inline />
        </FormGroup>
    )
}

export default CheckboxSetPermissions
