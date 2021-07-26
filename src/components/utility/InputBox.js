import React from 'react';
import FormControl from 'react-bootstrap/FormControl'

const InputBox = React.forwardRef((props, ref) => (
    <FormControl ref={ref} {...props}/>
));

export default InputBox
