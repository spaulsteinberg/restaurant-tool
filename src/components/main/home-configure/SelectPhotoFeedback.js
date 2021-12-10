import { Snackbar } from '@material-ui/core'
import React from 'react'

const SelectPhotoFeedback = ({loading, success, error}) => {
    // replace w success and error snackbar - remove loading
    return (
        <Snackbar open={loading} autoHideDuration={6000} message="Hello there nah" />
    )
}

export default SelectPhotoFeedback
