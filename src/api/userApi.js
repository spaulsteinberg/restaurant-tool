import { db } from "../firebase";

const updatePermissions = (newPermissions, isAdmin) => {
    if (!isAdmin) return Promise.reject("You do not have permission to set roles!");
    let batch = db.batch()
    for(const permission of newPermissions){
        batch
            .update(db.collection(process.env.REACT_APP_USER_DB_COLLECTION).doc(permission.id), 
            { roles: { read: true, write: permission.write, admin: permission.admin}})
    }
    return batch.commit()
}

const getPermissionsFromUserObject = async (uid) => db.collection(process.env.REACT_APP_USER_DB_COLLECTION).doc(uid).get()

export { updatePermissions, getPermissionsFromUserObject }