import React from 'react'
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'

const InputLinks = () => {
    return (
        <FormGroup className="my-2" id="home-links-input">
            <FormLabel>Enter any links you would like to display: </FormLabel>
            <FormControl />
        </FormGroup>
    )
}

export default InputLinks
