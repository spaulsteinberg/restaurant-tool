import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';

const RouteButtonTitle = ({showActions, title}) => {
    const defaultTitle = "Would you like to Add or Edit?"
    return (
        <DialogTitle 
            id="form-dialog-button-title" 
            className="text-center">
                {showActions ? defaultTitle : title }
        </DialogTitle>
    )
}

export default RouteButtonTitle
