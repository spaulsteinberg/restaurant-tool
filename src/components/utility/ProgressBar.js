import React from 'react';
import { LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types'

const ProgressBar = ({variant, color, ...otherProps}) => {
    return (
        <div {...otherProps}>
            <LinearProgress variant={variant} color={color} />
        </div>
    )
}

ProgressBar.propTypes = {
    variant: PropTypes.string,
    color: PropTypes.oneOf(["primary", "secondary"]),
    margin: PropTypes.string,
    alignment: PropTypes.string,
}

ProgressBar.defaultProps = {
    variant: "indeterminate",
    color: "primary",
}

export default ProgressBar;