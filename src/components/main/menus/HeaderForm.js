import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputBox from '../../utility/InputBox';
import SaveDiscardButtons from '../../utility/SaveDiscardButtons';

const HeaderForm = React.forwardRef(({form, handleInputChange, saveClick, discardClick, saveIcon, discardIcon}, ref) => (
        <Form className="text-dark" ref={ref}>
            <FormGroup className="m-2">
                <label name="title-label">Menu or Section Name</label>
                <InputBox name="name" type="text" value={form.name} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="m-2">
                <label name="description-label">Optional Description</label>
                <InputBox name="optionalMessage" type="text" value={form.optionalMessage} onChange={handleInputChange} />
            </FormGroup>
            <SaveDiscardButtons saveChange={saveClick} discardChange={discardClick} saveIcon={saveIcon} discardIcon={discardIcon} classes="mt-2" />
        </Form>
    ))

export default HeaderForm;