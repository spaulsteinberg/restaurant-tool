import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { circleSlashForCancelPaths, saveIcon } from '../../constants/svg/svgs';

const SaveDiscardButtons = ({saveChange, discardChange, saveIcon, discardIcon, classes, marginSave = "mx-1", marginCancel = "mx-1"}) => {
    return (
        <div className={classes}>
            <Button variant="primary" type="submit" className={`${marginSave} icon-button`} onClick={saveChange}>
                {saveIcon}
            </Button>
            <Button variant="danger" className={`${marginCancel} icon-button`} onClick={discardChange}>
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

SaveDiscardButtons.defaultProps = {
    saveIcon: saveIcon,
    discardIcon: circleSlashForCancelPaths
}

export default SaveDiscardButtons
