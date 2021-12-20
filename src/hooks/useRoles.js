import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useAuth } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import { userLogout } from "../redux/globalActionTypes";

const useRoles = () => {
    const dispatch = useDispatch()
    const [roles, setRoles] = useState();
    const { currentUser, logout } = useAuth();
    const { user, getUserRoles } = useUserContext();

    useEffect(
        () => {
            const fetchRoles = async () => {
                if (currentUser?.email) {
                    if (JSON.stringify(user) === '{}') {
                        let roles = await getUserRoles(currentUser.email);
                        // set roles or if none exist logout user
                        if (roles) setRoles(roles)
                        else {
                            dispatch(userLogout())
                            logout()
                        }
                    } else if (!user?.roles) {
                        // user has no assigned roles and needs to contact admin
                        dispatch(userLogout())
                        logout();
                    } else {
                        setRoles(user.roles)
                    }
                }
            }
            fetchRoles();
        }, [currentUser, user, logout, getUserRoles, dispatch])
    return roles
}

export default useRoles;