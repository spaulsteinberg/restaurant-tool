import React from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import ActionRadioGroup from './ActionRadioGroup';
import RouteForm from './RouteForm';
import EditRouteButtonForm from './EditRouteButtonForm';

const RouteButtonContent = ({showActions, value, handleChange, addValue, editValue, modalContentProps, showEditForm, handleOnClose}) => {
    return (
        <DialogContent>
            {
                showActions ?
                    <ActionRadioGroup
                        value={value}
                        handleChange={handleChange}
                        addValue={addValue}
                        editValue={editValue} />
                    : 
                    value === addValue 
                    ? <RouteForm handleOnClose={handleOnClose} modalContentProps={modalContentProps?.data}/> 
                    : <EditRouteButtonForm handleOnClose={handleOnClose} modalContentProps={modalContentProps?.data} showEditForm={showEditForm} />
            }
        </DialogContent>
    )
}

export default RouteButtonContent
