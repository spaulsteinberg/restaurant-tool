import React from 'react'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import SaveDiscardButtons from '../../utility/SaveDiscardButtons'
import Disclaimer from '../../utility/Disclaimer'
import LoadingSpinner from '../../utility/LoadingSpinner'

const RestaurantNameInput = ({restaurantName, handleInputChange, handleSave, handleDiscard, submitState}) => {
    return (
        <React.Fragment>
            <FormGroup className="input-container">
                <FormLabel>Enter your restaurants display name: </FormLabel>
                {submitState.error && <Disclaimer classes="text-danger">{submitState.error}</Disclaimer>}

                <FormControl value={restaurantName} onChange={handleInputChange} name="restaurantName" aria-label="restaurant-name" disabled={submitState.loading} />
            </FormGroup>
            {submitState.loading ?
                <div className="spinner-align-center">
                    <LoadingSpinner alignment="centered" variant="primary" />
                </div>
                : <SaveDiscardButtons classes="button-styles" saveChange={handleSave} discardChange={handleDiscard} />
            }
        </React.Fragment>
    )
}

export default RestaurantNameInput
