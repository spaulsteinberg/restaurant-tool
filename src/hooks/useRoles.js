import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPermissionsFromUserObject } from "../api/userApi";
import { useAuth } from "../contexts/AuthContext";
import { userLogout } from "../redux/globalActionTypes";
import { getPermissionsSuccess } from "../redux/permissions/permissionActions";

const useRoles = () => {
    const dispatch = useDispatch()
    const permissions = useSelector(state => state.permissions?.roles)
    const [roles, setRoles] = useState();
    const { currentUser, logout } = useAuth();

    useEffect(
        () => {
            const fetchRoles = async () => {
                if (currentUser?.email) {
                    // no store
                    if (!permissions) {
                        let roles = await getPermissionsFromUserObject(currentUser.uid)
                        // set roles or if none exist logout user
                        if (roles && roles.data()) {
                            setRoles(roles.data().roles)
                            dispatch(getPermissionsSuccess({roles: roles.data().roles, email: currentUser.email}))
                        }
                        else {
                            console.error("Permissions call failed. Please try logging back in.")
                            dispatch(userLogout())
                            logout()
                        }
                    } else {
                        setRoles(permissions)
                    }
                }
            }
            fetchRoles();
        }, [currentUser, logout, dispatch, permissions])
    return roles
}

export default useRoles;