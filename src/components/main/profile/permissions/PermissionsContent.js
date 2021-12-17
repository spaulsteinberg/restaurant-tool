import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePermissions } from '../../../../api/userApi'
import { saveUsers } from '../../../../redux/user/userActions'
import EditPermissionsBody from './EditPermissionsBody'
import SavePermissionsButton from './SavePermissionsButton'


const PermissionsContent = ({ data, isAdmin }) => {

    const dispatch = useDispatch()

    const [permissionState, setPermissionState]
        = useState(data ? data.map(d => { return { id: d.id, email: d.email, write: d.roles?.write, admin: d.roles?.admin } }) : null)

    const [submitState, setSubmitState] = useState({loading: false, success: null, error: null})

    const [touched, setTouched] = useState(false)

    const handleCheck = (e, indx) => {
        setTouched(true)
        const { name, checked } = e.target;
        return setPermissionState(prev => prev.map((p, i) => {
            if (i === indx){
                if (name === "admin" && checked) return { ...p, admin: true, write: true}
                return {...p, [name]: checked }
            }
            return p
        }))
    }

    const handleSave = () => {
        setSubmitState({loading: true, success: null, error: null})
        updatePermissions(permissionState, isAdmin)
        .then(res => {
            // since we are saving multple array items at multiple places, will need to send all data back to redux
            const newPermissions = permissionState.map(p => { return { read: true, write: p.write, admin: p.admin} })
            const dCopy = [...data]
            for (let i = 0; i < dCopy.length; i++){
                const user = {...dCopy[i]}
                user.roles = {...newPermissions[i]}
                dCopy[i] = user
            }
            dispatch(saveUsers(dCopy))
            setSubmitState({loading: false, success: 'Saved!', error: null})
        })
        .catch(err => {
            console.log(err)
            setSubmitState({loading: false, error: 'Could not save permissions.', success: null})
        })
        .finally(() => setTouched(false))
    }

    return (
        <React.Fragment>
            <EditPermissionsBody data={data} permissionState={permissionState} handleCheck={handleCheck} />
            <SavePermissionsButton loading={submitState.loading} success={submitState.success} error={submitState.error} touched={touched} handleSave={handleSave} />
        </React.Fragment>
    )
}

export default PermissionsContent
