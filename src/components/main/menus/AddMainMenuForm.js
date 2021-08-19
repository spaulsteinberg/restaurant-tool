import React, { useRef, useEffect } from 'react'
import { Alert, Form } from 'react-bootstrap';
import FormGroup from 'react-bootstrap/FormGroup'
import InputBox from '../../utility/InputBox'
import LoadingSpinner from '../../utility/LoadingSpinner';
import SaveDiscardButtons from '../../utility/SaveDiscardButtons';

const AddMainMenuForm = ({save, discard, handleInputChange, handleCheckClick, values, formState}) => {
    const ref = useRef();
    useEffect(() => {
        ref.current.focus()
    }, [])
    return (
        <Form>
            <FormGroup>
                <label>Menu Name</label>
                <InputBox ref={ref} className="my-2" type="text" name="name" value={values.name} onChange={handleInputChange} disabled={formState.loading}/>
            </FormGroup>
            <FormGroup>
                <label>Description</label>
                <InputBox className="my-2" type="text" name="description" value={values.description} onChange={handleInputChange} disabled={formState.loading}/>
            </FormGroup>
            <FormGroup>
            <Form.Label style={{padding: 0}}>Redirect to View/Edit on Success?</Form.Label>
            </FormGroup>
            <FormGroup>
                <Form.Check
                    inline
                    className="relaign-react-boot-form-check"
                    aria-label="Redirect to View/Edit on Success?"
                    type="checkbox"
                    name="redirect"
                    onClick={handleCheckClick}
                    defaultChecked={values.redirect}
                    disabled={formState.loading}
                />
            </FormGroup>
            <SaveDiscardButtons saveChange={save} discardChange={discard}/>
            {formState.loading && <div className="mt-2"><LoadingSpinner variant="primary" alignment="centered" className="m-3">Adding...</LoadingSpinner></div>}
            {formState.errors && <small className="text-danger">{formState.errors}</small>}
            {formState.success && <Alert variant="primary" className="mt-2 text-center">Menu added successfully!</Alert>}
        </Form>
    )
}

export default AddMainMenuForm
