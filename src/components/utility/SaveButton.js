import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { saveIcon } from '../../constants/svg/svgs';

const SaveButton = ({icon, children, ...rest}) => {
    return (
        <Button variant="primary" type="submit" {...rest}>
            {icon}
            {children}
        </Button>
    )
}

SaveButton.propTypes = {
    icon: PropTypes.element
}

SaveButton.defaultProps = {
    icon: saveIcon
}

export default SaveButton
