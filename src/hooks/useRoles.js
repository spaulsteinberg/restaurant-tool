import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";

const useRoles = () => {
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
                        roles ? setRoles(roles) : logout()
                    } else if (!user?.roles) {
                        // user has no assigned roles and needs to contact admin
                        logout();
                    } else {
                        setRoles(user.roles)
                    }
                }
            }
            fetchRoles();
        }, [currentUser, user, logout, getUserRoles])
    return roles
}

export default useRoles;