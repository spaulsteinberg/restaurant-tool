import * as goalTypes from './goalTypes';
import {db} from '../../firebase';
import firebase from "firebase/app";

export const loadGoals = () => {
    return {
        type: goalTypes.LOAD_GOALS
    }
}

export const loadGoalsSuccess = goals => {
    return {
        type: goalTypes.LOAD_GOALS_SUCCESS,
        payload: goals
    }
}

export const loadGoalsError = error => {
    return {
        type: goalTypes.LOAD_GOALS_ERROR,
        payload: error
    }
}

export const addGoal = () => {
    return {
        type: goalTypes.ADD_GOAL
    }
}

export const addGoalSuccess = goal => {
    return {
        type: goalTypes.ADD_GOAL_SUCCESS,
        payload: goal
    }
}

export const addGoalError = () => {
    return {
        type: goalTypes.ADD_GOAL_ERROR
    }
}

export const removeGoal = () => {
    return {
        type: goalTypes.REMOVE_GOAL
    }
}

export const removeGoalSuccess = goal => {
    return {
        type: goalTypes.REMOVE_GOAL_SUCCESS,
        payload: goal
    }
}

export const removeGoalError = () => {
    return {
        type: goalTypes.REMOVE_GOAL_ERROR
    }
}

export const retrieveGoals = email => {
    return async (dispatch) => {
        dispatch(loadGoals());
        await db.collection(process.env.REACT_APP_GOAL_DB_COLLECTION)
            .doc(email)
            .get()
            .then(response => response.data())
            .then(data => {
                if (data) dispatch(loadGoalsSuccess({goals: data.goals, hasGoals: true}))
                else dispatch(loadGoalsSuccess({goals: [], hasGoals: false}))
            })
            .catch(err => {
                dispatch(loadGoalsError(err))
            })
    }
}

export const addNewGoal = (email, goal, userHasGoalsInCollection) => {
    return async (dispatch) => {
        dispatch(addGoal())
        const docRef = db.collection(process.env.REACT_APP_GOAL_DB_COLLECTION).doc(email);

        // if user does not exist in collection then set them
        if (!userHasGoalsInCollection) {
            await docRef.set({goals: [goal]})
            .then(() => dispatch(addGoalSuccess(goal)))
            .catch(() => dispatch(addGoalError()))
        }
        else {
            // arrayUnion wont store duplicates
            await docRef.update({
                goals: firebase.firestore.FieldValue.arrayUnion(goal)
            })
            .then(() => dispatch(addGoalSuccess(goal)))
            .catch(() => dispatch(addGoalError()))
        }
    }
}

export const deleteGoal = (email, goal) => {
    return async (dispatch) => {
        dispatch(removeGoal());
        db.collection(process.env.REACT_APP_GOAL_DB_COLLECTION)
        .doc(email)
        .update({
            goals: firebase.firestore.FieldValue.arrayRemove(goal)
        })
        .then(() => dispatch(removeGoalSuccess(goal)))
        .catch(() => dispatch(removeGoalError()))
    }
}