import React from 'react'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'

const InputRestaurantName = () => {
    return (
        <FormGroup id="restaurant-name-input">
            <FormLabel>Enter your restaurants display name: </FormLabel>
            <FormControl />
        </FormGroup>
    )
}

export default InputRestaurantName
