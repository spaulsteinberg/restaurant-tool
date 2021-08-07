import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const SaveDiscardButtons = ({saveChange, discardChange, saveIcon, discardIcon, classes}) => {
    return (
        <div className={classes}>
            <Button variant="primary" type="submit" className="mx-1 icon-button" onClick={saveChange}>
                {saveIcon}
            </Button>
            <Button variant="danger" className="mx-1 icon-button" onClick={discardChange}>
                {discardIcon}
            </Button>
        </div>
    )
}

SaveDiscardButtons.propTypes = {
    saveChange: PropTypes.func,
    discardChange: PropTypes.func,
    saveIcon: PropTypes.element,
    discardIcon: PropTypes.element,
    classes: PropTypes.string,
}

export default SaveDiscardButtons