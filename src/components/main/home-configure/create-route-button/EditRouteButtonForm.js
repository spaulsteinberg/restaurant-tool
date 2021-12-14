import React, { useState } from 'react'
import RouteForm from './RouteForm';
import EditRouteRadioGroup from './EditRouteRadioGroup';

const EditRouteButtonForm = ({ showEditForm,  handleOnClose, modalContentProps}) => {

    const [radioValue, setRadioValue] = useState(modalContentProps && modalContentProps.length > 0 ? modalContentProps[0].display : "")
    const [formData, setFormData] = useState(modalContentProps && modalContentProps.length > 0 ? modalContentProps[0] : {});

    const handleChange = event => {
        setRadioValue(event.target.value)
        setFormData(modalContentProps.find(md => md.display === event.target.value))
    }
    
    return (
        <React.Fragment>
            { !showEditForm && <EditRouteRadioGroup radioValue={radioValue} handleChange={handleChange} data={modalContentProps} />}
            {showEditForm && <RouteForm handleOnClose={handleOnClose} initState={formData} modalContentProps={modalContentProps} />}
        </React.Fragment>
    )
}

export default EditRouteButtonForm
