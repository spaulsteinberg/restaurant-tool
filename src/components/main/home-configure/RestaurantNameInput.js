import React from 'react'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import Disclaimer from '../../utility/Disclaimer'
import LoadButtonState from './LoadButtonState'

const RestaurantNameInput = ({restaurantName, handleInputChange, handleSave, handleDiscard, submitState}) => {
    return (
        <React.Fragment>
            <FormGroup className="input-container">
                <FormLabel>Enter your restaurants display name: </FormLabel>
                {submitState.error && <Disclaimer classes="text-danger">{submitState.error}</Disclaimer>}
                <FormControl value={restaurantName} onChange={handleInputChange} name="restaurantName" aria-label="restaurant-name" disabled={submitState.loading} />
            </FormGroup>
            <LoadButtonState 
                state={submitState.loading} 
                spinnerAlign="centered" 
                spinnerVariant="primary" 
                spinnerClasses="spinner-align-center"
                buttonContClasses="name-button-state-container"
                buttonClasses="button-styles"
                onSave={handleSave}
                onDiscard={handleDiscard} />
        </React.Fragment>
    )
}

export default RestaurantNameInput
