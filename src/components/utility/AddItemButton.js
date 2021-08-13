import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import { sectionClipboardIcon } from '../../constants/svg/svgs';

const AddItemButton = ({variant, children, icon, ...rest}) => {
    return (
        <Button variant={variant} {...rest}>
            {icon} {children ? <span className="mx-2">{children}</span> : null}
        </Button>
    )
}

AddItemButton.propTypes = {
    variant: PropTypes.string,
    icon: PropTypes.element
}

AddItemButton.defaultProps = {
    variant: "primary",
    icon: sectionClipboardIcon
}

export default AddItemButton
