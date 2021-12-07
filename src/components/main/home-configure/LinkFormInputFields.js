import React from 'react'
import Disclaimer from '../../utility/Disclaimer'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'

const LinkFormInputFields = ({ error, text, name, value, handleInputChange }) => {
    return (
        <React.Fragment>
            <FormLabel>{text}</FormLabel>
            <FormControl className={error && "error-input-box"} value={value} name={name} onChange={handleInputChange} />
            {error && <Disclaimer classes="text-danger">{error}</Disclaimer>}
        </React.Fragment>
    )
}

export default LinkFormInputFields
