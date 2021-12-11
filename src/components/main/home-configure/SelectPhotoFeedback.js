import { Snackbar, Alert } from '@material-ui/core'
import React from 'react'

const SelectPhotoFeedback = ({ open, success, error, handleClose }) => {
    // replace w success and error snackbar - remove loading
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={success ? "success" : error ? "error" : "info"} variant='filled'>
                {success ? success : error ? error : "Uploading image..."}
            </Alert>
        </Snackbar>
    )
}

export default SelectPhotoFeedback
