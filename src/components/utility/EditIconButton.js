import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const EditIconButton = ({variant, icon, text, textColor, ...rest}) => {
    return (
        <Button variant={variant} {...rest} >
            {icon} <span className="mx-2" style={{color: textColor}}>{text}</span>
        </Button>
    )
}

EditIconButton.propTypes = {
    variant: PropTypes.string,
    icon: PropTypes.element,
    text: PropTypes.string,
    textColor: PropTypes.string,
}

EditIconButton.defaultProps = {
    variant: "warning",
    text: "Edit",
    textColor: "black"
}

export default EditIconButton
