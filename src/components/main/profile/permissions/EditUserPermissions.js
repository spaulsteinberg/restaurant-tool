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
        dispatch(getUsersRequest(isAdmin, email))
    }, [dispatch, isAdmin, email])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{ usersState.loading ? "Loading Users" : "Viewing Current Users" }</DialogTitle>
            <DialogContent>
                <PermissionsLoading loading={usersState.loading} />
                <PermissionsContent data={usersState.data} />
                <PermissionsError error={usersState.error} />
            </DialogContent>
        </Dialog>
    )
}

export default EditUserPermissions
