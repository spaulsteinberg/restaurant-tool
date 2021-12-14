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

    const [showEditForm, setShowEditForm] = useState(false)

    const handleChange = event => {
        event.stopPropagation();
        setValue(event.target.value)
    }

    const handleOnClose = () => {
        setModalContentProps(propsInitialState)
        handleClose()
    }

    const setActions = () => setShowActions(a => !a)

    const handleNextClick = () => {
        setModalContentProps({
            title: value === HOME_MODAL_ACTIONS.ADD ? "Please make add selections: " : "Edit Route: ", 
            data: value === HOME_MODAL_ACTIONS.ADD ? data.map(d => d.display) : data
        })
        setShowActions(false)
        setShowEditForm(false)
    }

    const handleSecondNextClickForEditing = () => {
        setShowEditForm(true)
        setShowActions(false)
    }

    const handleSecondBackClickForEditing = () => {
        setShowEditForm(false)
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
                showEditForm={showEditForm}
                handleOnClose={handleOnClose}
                />
            <RouteButtonActions 
                showActions={showActions} 
                mode={value} 
                hasButtons={data && data.length > 0}
                showEditForm={showEditForm}
                handleNextClick={handleNextClick} 
                handleBackClick={setActions}
                hsncfe={handleSecondNextClickForEditing}
                hsbcfe={handleSecondBackClickForEditing} />
        </Dialog>
    )
}

export default RouteButtonModal
