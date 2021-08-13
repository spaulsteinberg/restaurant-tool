import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import { trashIcon } from '../../constants/svg/svgs';

const RemoveItemButton = ({children, icon, ...rest}) => {
    return (
        <Button variant="danger" {...rest}>
            {icon}
        </Button>
    )
}

RemoveItemButton.propTypes = {
    icon: PropTypes.element
}

RemoveItemButton.defaultProps = {
    icon: trashIcon
}

export default RemoveItemButton