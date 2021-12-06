import React from 'react'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import SaveDiscardButtons from '../../utility/SaveDiscardButtons'
import LoadingSpinner from '../../utility/LoadingSpinner'
import Disclaimer from '../../utility/Disclaimer'

const DescriptionInput = ({description, handleInputChange, handleOnSave, handleOnDiscard, submitState}) => {
    return (
        <React.Fragment>
            <FormGroup className="home-description-input">
                <FormLabel>Enter a Home Description</FormLabel>
                <FormControl as="textarea" rows="6" value={description} onChange={handleInputChange} disabled={submitState.loading} />
                {submitState.error && <Disclaimer classes="text-danger">{submitState.error}</Disclaimer>}
                <div className="description-input-button-container justify-content-center">
                    {
                        submitState.loading ?
                            <div className="spinner-align-desc">
                                <LoadingSpinner alignment="centered" variant="primary" />
                            </div>
                            : <SaveDiscardButtons classes="save-disc-desc" saveChange={handleOnSave} discardChange={handleOnDiscard} />
                    }                
                </div>
            </FormGroup>
        </React.Fragment>
    )
}

export default DescriptionInput
