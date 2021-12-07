import React from 'react';
import PropTypes from 'prop-types';
import SaveDiscardButtons from '../../utility/SaveDiscardButtons';
import LoadingSpinner from '../../utility/LoadingSpinner'

const LoadButtonState = ({state, spinnerClasses, buttonContClasses, buttonClasses = "mt-1", spinnerAlign, spinnerVariant, onSave, onDiscard}) => {
    return (
        <React.Fragment>
            {
                state ?
                    <div className={spinnerClasses}>
                        <LoadingSpinner alignment={spinnerAlign} variant={spinnerVariant} />
                    </div>
                    :
                    <div className={buttonContClasses}>
                        <SaveDiscardButtons saveChange={onSave} discardChange={onDiscard} classes={buttonClasses} />
                    </div>
            }
        </React.Fragment>
    )
}

LoadButtonState.propTypes = {
    state: PropTypes.bool.isRequired,
    spinnerClasses: PropTypes.string,
    buttonContClasses: PropTypes.string,
    spinnerAlign: PropTypes.string,
    spinnerVariant: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onDiscard: PropTypes.func.isRequired,
    buttonClasses: PropTypes.string
}

export default LoadButtonState
