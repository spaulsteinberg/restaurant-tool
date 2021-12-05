import React from 'react'
import PropTypes from 'prop-types';

const ErrorMessageBlock = ({message, adjustment}) => {
    return (
        <div className={`text-danger justify-content-center margin-top-${adjustment}`}>
            <p>{message}</p>
        </div>
    )
}

ErrorMessageBlock.defaultProps = {
    adjustment: 0
}

ErrorMessageBlock.propTypes = {
    message: PropTypes.string.isRequired,
    adjustment: PropTypes.oneOf([0, 1, 2, 3])
}

export default ErrorMessageBlock
