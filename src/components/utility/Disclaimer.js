import React from 'react';
import PropTypes from 'prop-types';

const Disclaimer = ({children, classes, iconComponent = null}) => {
    return (
        <div className={classes}>
            <small>
                {iconComponent}
                {children}
            </small>
        </div>
    )
}

Disclaimer.defaultProps = {
    classes : "order-table-disclaimer"
}

Disclaimer.propTypes = {
    children: PropTypes.string,
    classes: PropTypes.string,
    iconComponent: PropTypes.element
}

export default Disclaimer;
