import React from 'react'
import Form from 'react-bootstrap/Form'
import Disclaimer from '../../../utility/Disclaimer'

const ChooseRouteAttrInput = ({ value, name, handleChange, error, touched, isSubmitting, labelText, subLabelText = null, autoFocus = false }) => {
    return (
        <Form.Group>
            <Form.Label dangerouslySetInnerHTML={{__html: `${labelText}`}}></Form.Label>
            { subLabelText ? <div><small className="text-info" dangerouslySetInnerHTML={{__html: `${subLabelText}`}}></small></div> : null }
            <Form.Control className={error && touched && "is-invalid"} value={value} aria-label={`Input ${name}`} name={name} onChange={handleChange} disabled={isSubmitting} autoFocus={autoFocus} />
            { error && touched ? <Disclaimer classes='text-danger'>{error}</Disclaimer> : null}
        </Form.Group>
    )
}

export default ChooseRouteAttrInput
