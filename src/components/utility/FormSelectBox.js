import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import PropTypes from 'prop-types';

const FormSelectBox = ({options, defaultText, defaultValue, changeFunction, method = 1, defaultDisabled = true, ...rest}) => {
    console.log(options)
    return (
        <FormControl as="select" defaultValue={defaultValue} onChange={changeFunction} {...rest}>
            <option value={defaultValue} disabled={defaultDisabled}>{defaultText}</option>
            {
                method === 1 ? options.map(option => <option key={option} value={option}>{option}</option>)
                : options.map(option => <option key={option.text} value={option.text} style={{backgroundColor: option.highlight ? 'orange' : null}}>{option.text}</option>)
            }
        </FormControl>
    )
}

FormSelectBox.propTypes = {
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        highlight: PropTypes.bool
    }))]).isRequired,
    defaultText: PropTypes.string,
    changeFunction: PropTypes.func,
    method: PropTypes.number,
}

export default FormSelectBox;
