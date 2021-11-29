import React from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const MenuSelectionButton = React.forwardRef(({handleClick, buttonText}, ref) => (
    <Button variant="outline-light" size="lg" className="w-50" onClick={handleClick} ref={ref}>{buttonText}</Button>
))

MenuSelectionButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired
}

export default MenuSelectionButton
