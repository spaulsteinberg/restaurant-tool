import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import PropTypes from 'prop-types';

const FormSelectBox = ({options, defaultText, changeFunction, defaultDisabled = true}) => {
    return (
        <FormControl as="select" defaultValue={'default'} onChange={changeFunction}>
            <option value="default" disabled={defaultDisabled}>{defaultText}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </FormControl>
    )
}

FormSelectBox.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    defaultText: PropTypes.string,
    changeFunction: PropTypes.func
}

export default FormSelectBox;
