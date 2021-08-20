import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import PropTypes from 'prop-types';

const ControlledFormSelect = ({options, method = 1, defaultDisabled = false, ...rest}) => {
    return (
        <FormControl as="select" {...rest}>
            { method === 1 || method === 2 ?
            <React.Fragment>
                <option value={options[0].text} disabled={defaultDisabled}>{options[0].text}</option>
                {
                    method === 1 ? options.map(option => <option key={option} value={option}>{option}</option>)
                    : options.slice(1).map(option => <option key={option.text} value={option.text} style={{backgroundColor: option.highlight ? 'orange' : null}}>{option.text}</option>)
                }
            </React.Fragment>
            : 
            <React.Fragment>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </React.Fragment>
            }
        </FormControl>
    )
}

ControlledFormSelect.propTypes = {
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        highlight: PropTypes.bool
    }))]).isRequired,
    method: PropTypes.number,
}

export default ControlledFormSelect;