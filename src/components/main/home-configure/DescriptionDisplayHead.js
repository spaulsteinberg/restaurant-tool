import React from 'react'
import FormLabel from 'react-bootstrap/FormLabel'
import EditIconButton from '../../utility/EditIconButton'

const DescriptionDisplayHead = ({handleSetEditable}) => {
    return (
        <div className="home-description-head-container">
            <FormLabel className="home-label-text pt-0">Edit Home Description</FormLabel>
            <EditIconButton className="display-edit-button" text="" onClick={handleSetEditable}/>
        </div>
    )
}

export default DescriptionDisplayHead
