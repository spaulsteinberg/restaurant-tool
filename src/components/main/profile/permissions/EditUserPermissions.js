import React, { useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersRequest } from '../../../../redux/user/userActions'
import DialogContent from '@material-ui/core/DialogContent'
import PermissionsLoading from './PermissionsLoading'
import PermissionsContent from './PermissionsContent'
import PermissionsError from './PermissionsError'

const EditUserPermissions = ({open, handleClose, isAdmin, email}) => {

    const dispatch = useDispatch()

    const usersState = useSelector(state => state.users)

    useEffect(() => {
        !usersState.data && dispatch(getUsersRequest(isAdmin, email))
    }, [usersState.data, dispatch, isAdmin, email])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{ usersState.loading ? "Loading Users" : "Viewing Current Users" }</DialogTitle>
            <DialogContent>
                <PermissionsLoading loading={usersState.loading} />
                { !usersState.loading && usersState.data ? <PermissionsContent data={usersState.data} isAdmin={isAdmin} /> : null}
                { !usersState.loading ? <PermissionsError error={usersState.error} /> : null }
            </DialogContent>
        </Dialog>
    )
}

export default EditUserPermissions
