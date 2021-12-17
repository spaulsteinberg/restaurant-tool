import React from 'react'
import FormLabel from 'react-bootstrap/FormLabel'
import CheckboxSetPermissions from './CheckboxSetPermissions'

const EditPermissionsTile = ({email, permissions, indx, handleCheck}) => {
    return (
        <div className='mb-2'>
            <FormLabel>{email}</FormLabel>
            <CheckboxSetPermissions permissions={permissions} indx={indx} handleCheck={handleCheck} />
        </div>
    )
}

export default EditPermissionsTile
