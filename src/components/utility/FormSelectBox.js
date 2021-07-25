import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import PropTypes from 'prop-types';

const FormSelectBox = ({options, defaultText, defaultValue, changeFunction, defaultDisabled = true}) => {
    return (
        <FormControl as="select" defaultValue={defaultValue} onChange={changeFunction}>
            <option value={defaultValue} disabled={defaultDisabled}>{defaultText}</option>
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
