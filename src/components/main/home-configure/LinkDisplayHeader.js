import React from 'react'
import FormLabel from 'react-bootstrap/FormLabel'
import EditIconButton from '../../utility/EditIconButton'

const LinkDisplayHeader = ({handleSetEditable}) => {
    return (
        <div className="link-edit-container">
            <FormLabel className="home-label-text pt-0">Edit Links</FormLabel>
            <EditIconButton text="" className="display-edit-button" onClick={handleSetEditable} />
        </div>
    )
}

export default LinkDisplayHeader
