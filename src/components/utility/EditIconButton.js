import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { pencilOutlineFull } from '../../constants/svg/svgs';

const EditIconButton = ({variant, icon, text, textColor, ...rest}) => {
    return (
        <Button variant={variant} {...rest} >
            {icon} {text ? <span className="mx-2" style={{color: textColor}}>{text}</span> : null}
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
    textColor: "black",
    icon: pencilOutlineFull
}

export default EditIconButton
