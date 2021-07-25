import React from 'react';
import PropTypes from 'prop-types';

const Disclaimer = ({text, classes, iconComponent = null}) => {
    return (
        <div className={classes}>
            <small>
                {iconComponent}
                {text}
            </small>
        </div>
    )
}

Disclaimer.defaultProps = {
    text: "",
    classes : "order-table-disclaimer"
}

Disclaimer.propTypes = {
    text: PropTypes.string,
    classes: PropTypes.string,
    iconComponent: PropTypes.element
}

export default Disclaimer;
