import React from 'react'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import Disclaimer from '../../utility/Disclaimer'
import LoadButtonState from './LoadButtonState'

const DescriptionInput = ({description, handleInputChange, handleOnSave, handleOnDiscard, submitState}) => {
    return (
        <React.Fragment>
            <FormGroup className="home-description-input">
                <FormLabel>Enter a Home Description</FormLabel>
                <FormControl as="textarea" rows="6" value={description} onChange={handleInputChange} disabled={submitState.loading} />
                {submitState.error && <Disclaimer classes="text-danger">{submitState.error}</Disclaimer>}
                <div className="description-input-button-container justify-content-center">
                    <LoadButtonState 
                        state={submitState.loading} 
                        spinnerClasses="spinner-align-desc" 
                        spinnerAlign="centered"
                        spinnerVariant="primary"
                        buttonContClasses=""
                        buttonClasses="save-disc-desc"
                        onSave={handleOnSave}
                        onDiscard={handleOnDiscard} />
                </div>
            </FormGroup>
        </React.Fragment>
    )
}

export default DescriptionInput
