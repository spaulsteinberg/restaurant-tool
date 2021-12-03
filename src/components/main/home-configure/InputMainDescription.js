import React from 'react'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'

const InputMainDescription = () => {
    return (
        <FormGroup id="home-description-input">
            <FormLabel>Enter a Home Description</FormLabel>
            <FormControl as="textarea" rows="6"/>
        </FormGroup>
    )
}

export default InputMainDescription
