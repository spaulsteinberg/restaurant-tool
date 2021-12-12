import React from 'react'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const RouteButtonActions = ({showActions, handleNextClick}) => {
    return (
        <DialogActions>
            {showActions ? <Button variant='primary' onClick={handleNextClick}>Next</Button> : null}
        </DialogActions>
    )
}

export default RouteButtonActions
