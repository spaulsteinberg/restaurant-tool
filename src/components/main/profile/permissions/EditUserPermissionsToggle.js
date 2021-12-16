import React from 'react'

const EditUserPermissionsToggle = ({handleClick}) => {
    return (
        <p className="manage-permissions-toggle" onClick={handleClick}>Click to manage permissions</p>
    )
}

export default EditUserPermissionsToggle
