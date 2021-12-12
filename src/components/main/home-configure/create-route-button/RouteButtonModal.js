import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { HOME_MODAL_ACTIONS } from '../../../../constants/constants';
import RouteButtonTitle from './RouteButtonTitle';
import RouteButtonContent from './RouteButtonContent';
import RouteButtonActions from './RouteButtonActions';

const RouteButtonModal = ({show, handleClose, data}) => {

    const propsInitialState = {title: '', data: null}

    const [value, setValue] = useState(HOME_MODAL_ACTIONS.ADD)

    const [showActions, setShowActions] = useState(true)

    const [modalContentProps, setModalContentProps] = useState(propsInitialState)

    const handleChange = event => {
        event.stopPropagation();
        setValue(event.target.value)
    }

    const handleOnClose = () => {
        setModalContentProps(propsInitialState)
        handleClose()
    }

    const handleNextClick = () => {
        setModalContentProps({
            title: value === HOME_MODAL_ACTIONS.ADD ? "Please make add selections: " : "Editing Route Buttons", 
            data: data.map(d => d.display)
        })
        setShowActions(false)
    }

    return (
        <Dialog open={show} onClose={handleOnClose} aria-labelledby="form-dialog-button-title">
            <RouteButtonTitle showActions={showActions} title={modalContentProps.title} />
            <RouteButtonContent 
                showActions={showActions} 
                value={value} 
                handleChange={handleChange} 
                addValue={HOME_MODAL_ACTIONS.ADD}
                editValue={HOME_MODAL_ACTIONS.EDIT} 
                modalContentProps={modalContentProps}
                handleOnClose={handleOnClose}
                />
            <RouteButtonActions showActions={showActions} handleNextClick={handleNextClick} />
        </Dialog>
    )
}

export default RouteButtonModal
