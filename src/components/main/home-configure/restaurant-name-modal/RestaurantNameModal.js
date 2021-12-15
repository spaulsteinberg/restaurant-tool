import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import RestNameTitle from './RestNameTitle'
import RestaurantFormWrapper from './RestaurantFormWrapper'

const RestaurantNameModal = ({show, handleClose, data}) => {
    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="name-dialog-in-modal">
            <RestNameTitle title={data.display} />
            <RestaurantFormWrapper data={data} handleClose={handleClose}/>
        </Dialog>
    )
}

export default RestaurantNameModal
