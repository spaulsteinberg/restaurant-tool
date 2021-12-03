
const initialState = { padded: true }

export const themeReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PADDED:
            return {...state, padded: true}
        case UNSET_PADDED:
            return {...state, padded: false}
        default:
            return state;
    }
}

export const SET_PADDED = 'SET_PADDED';
export const UNSET_PADDED = 'UNSET_PADDED'