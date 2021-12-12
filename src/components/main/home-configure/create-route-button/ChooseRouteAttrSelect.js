import React from 'react'
import Form from 'react-bootstrap/Form'
import Disclaimer from '../../../utility/Disclaimer'

const ChooseRouteAttrSelect = ({ options, value, name, handleChange, error, touched, isSubmitting, labelText, subLabelText = null }) => {
    return (
        <Form.Group>
            <Form.Label>{labelText}</Form.Label>
            { subLabelText ? <Disclaimer classes="text-info">{subLabelText}</Disclaimer> : null }
            <Form.Control className={error && touched && "is-invalid"} value={value} as="select" aria-label={`Select ${name}`} name={name} onChange={handleChange} disabled={isSubmitting}>
                <option value="" disabled></option>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </Form.Control>
            { error && touched ? <Disclaimer classes='text-danger'>{error}</Disclaimer> : null}
        </Form.Group>
    )
}

export default ChooseRouteAttrSelect
