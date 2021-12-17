import React from 'react'
import EditPermissionsTile from './EditPermissionsTile'
import PermissionsEmptyState from './PermissionsEmptyState'

const EditPermissionsBody = ({data, permissionState, handleCheck}) => {
    return (
        <React.Fragment>
            {
                data && data.length > 0 ? 
                permissionState.map((d, indx) => <EditPermissionsTile email={d.email} permissions={d} key={d.email} indx={indx} handleCheck={handleCheck}/>) 
                : <PermissionsEmptyState />
            }
        </React.Fragment>
    )
}

export default EditPermissionsBody
