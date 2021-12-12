import React from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import ActionRadioGroup from './ActionRadioGroup';
import AddRouteForm from './AddRouteForm';

const RouteButtonContent = ({showActions, value, handleChange, addValue, editValue, modalContentProps, handleOnClose}) => {
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
                    ? <AddRouteForm handleOnClose={handleOnClose} modalContentProps={modalContentProps?.data}/> 
                    : <p>put edit form here</p>
            }
        </DialogContent>
    )
}

export default RouteButtonContent
