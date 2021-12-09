import React from 'react'
import Disclaimer from '../../utility/Disclaimer'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'

const LinkFormInputFields = React.forwardRef(({ error, text, name, value, handleInputChange }, ref) => (
    <React.Fragment>
        <FormLabel>{text}</FormLabel>
        <FormControl className={error && "error-input-box"} value={value} name={name} onChange={handleInputChange} ref={ref} />
        {error && <Disclaimer classes="text-danger">{error}</Disclaimer>}
    </React.Fragment>
))
export default LinkFormInputFields
