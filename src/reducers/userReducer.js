
const initialState = {}
export const userReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_USER:
            return {...state, ...action.payload};
        case CLEAR_USER:
            return initialState;
        default:
            return state;
    }
}

export const ADD_USER = 'ADD_USER';
export const CLEAR_USER = 'CLEAR_USER';