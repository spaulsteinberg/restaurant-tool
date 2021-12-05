import React, { useState } from 'react'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'

const InputMainDescription = ({restDescription}) => {
    const [editable, setEditable] = useState(false)
    const [description, setDescription] = useState(restDescription)

    const handleInputChange = event => setDescription(event.target.value)

    return (
        <FormGroup id="home-description-input">
            <FormLabel>Enter a Home Description</FormLabel>
            <FormControl as="textarea" rows="6" value={description} onChange={handleInputChange} />
        </FormGroup>
    )
}

export default InputMainDescription
