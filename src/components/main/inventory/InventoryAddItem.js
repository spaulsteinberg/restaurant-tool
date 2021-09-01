import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { addItemIcon } from '../../../constants/svg/svgs';

const InventoryAddItem = ({wideView, ...rest}) => {
    return (
        <Button variant="primary" {...rest}>
            {addItemIcon}{wideView ? <span className="mx-1">New</span> : null}
        </Button>
    )
}

InventoryAddItem.propTypes = {
    wideView: PropTypes.bool.isRequired
}

export default InventoryAddItem
