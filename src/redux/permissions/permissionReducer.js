import * as TYPES from './PermissionTypes'
// use currentUser email to populate email field
// and move that field here
// then call roles if they are empty -- move these off the user context
// useRoles will then use this store instead of the user context

const initialState = {
    loading: false,
    roles: null,
    email: null,
    error: null
}

const permissionReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPES.GET_PERMISSIONS:
            return { ...state, loading: true }
        case TYPES.GET_PERMISSIONS_SUCCESS:
            return { ...state, loading: false, roles: action.payload.roles, email: action.payload.email, error: null }
        case TYPES.GET_PERMISSIONS_ERROR:
            return { ...state, loading: false, roles: null, error: action.payload }
        case TYPES.SET_PERMISSION_EMAIL:
            return { ...state, email: action.payload }
        default:
            return state;
    }
}

export default permissionReducer;