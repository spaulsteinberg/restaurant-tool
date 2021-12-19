import React from 'react'
import Form from 'react-bootstrap/Form'

const CredentialFormInput = ({labelText, groupId, labelId,  ...rest}) => {
    return (
        <Form.Group id={groupId}>
            <Form.Label id={labelId}>{labelText}</Form.Label>
            <Form.Control {...rest} />
        </Form.Group>
    )
}

export default CredentialFormInput
