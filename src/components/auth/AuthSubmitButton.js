import React from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types'

const AuthSubmitButton = ({margin, width, variant, handleSubmit, children}) => {
    return (
        <div className="text-center">
            <Button type="submit" className={`w-${width} ${margin}`} variant={variant} onClick={handleSubmit}>{children}</Button>
        </div>
    )
}

AuthSubmitButton.propTypes = {
    margin: PropTypes.string,
    width: PropTypes.number,
    handleSubmit: PropTypes.func.isRequired
}

export default AuthSubmitButton
