import React from 'react'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

const RestNameActions = ({loading, isDisabled}) => {
    return (
        <DialogActions>
            <Button variant="secondary" type="submit" className="name-submit-button" disabled={isDisabled}>Submit</Button>
        </DialogActions>
    )
}

export default RestNameActions
