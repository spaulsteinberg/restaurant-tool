import {
        LOAD_GOALS, LOAD_GOALS_SUCCESS, LOAD_GOALS_ERROR,
        ADD_GOAL, ADD_GOAL_SUCCESS, ADD_GOAL_ERROR,
        REMOVE_GOAL, REMOVE_GOAL_SUCCESS, REMOVE_GOAL_ERROR
    } from './goalTypes';

const initialState = {
    get: {
        loading: null,
        data: null,
        error: null
    },
    add: {
        loading: null,
        success: null,
        error: null
    },
    remove: {
        loading: null,
        success: null,
        error: null
    },
    goalsList: [],
    userHasGoals: null,
}

const goalReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_GOALS: {
            return {...state, get: {...state.get, loading: true}}
        }
        case LOAD_GOALS_SUCCESS: {
            return {...state, 
                get: {
                    ...state.get,
                    loading: false,
                    data: action.payload.goals,
                    error: null
                },
                goalsList: action.payload.goals,
                userHasGoals: action.payload.hasGoals
            }
        }
        case LOAD_GOALS_ERROR: {
            return {...state, get: {...state.get, loading: false, data: null, error: action.payload}}
        }
        case ADD_GOAL: {
            return {...state, add: {...state.add, loading: true, success: null, error: null}}
        }
        case ADD_GOAL_SUCCESS: {
            return {...state, 
                add: {
                    ...state.add, 
                    loading: false, 
                    success: true,
                    error: false
                }, 
                goalsList: [...state.goalsList, action.payload],
                userHasGoals: true
            }
        }
        case ADD_GOAL_ERROR: {
            return {...state, add: {...state.add, loading: false, success: false, error: true}}
        }
        case REMOVE_GOAL: {
            return {...state, remove: {...state.remove, loading: true}}
        }
        case REMOVE_GOAL_SUCCESS: {
            let newGoalsArray = [...state.goalsList]
            let target = action.payload;
            let indexToRemove = newGoalsArray
                                .findIndex(goal => 
                                    target.deliverable === goal.deliverable
                                    && target.goal === goal.goal
                                    && goal.timeable === target.timeable);
            if (!(indexToRemove < 0)) newGoalsArray.splice(indexToRemove, 1)
            return {
                ...state, 
                remove: {
                    ...state.remove,
                    loading: false,
                    success: true,
                    error: false
                },
                goalsList: newGoalsArray
            }
        }
        case REMOVE_GOAL_ERROR: {
            return {...state, remove: {...state.remove, loading: false, success: false, error: true}}
        }
        default:
            return state;
    }
}

export default goalReducer;