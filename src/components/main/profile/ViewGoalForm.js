import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { deleteGoal } from '../../../redux/goals/goalActions';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../utility/LoadingSpinner';
import { Alert } from 'react-bootstrap';

const ViewGoalForm = ({dispatch, goals, user}) => {

    const {loading, success, error} = useSelector(state => state.goals.remove);

    const handleOnChange = event => {
        event.preventDefault();
        return;
    }

    const handleDeleteClick = (e, goal) => {
        e.preventDefault();
        dispatch(deleteGoal(user.email, goal))
    }
    return (
        <>
        {
        goals.length === 0 ? <Alert variant="primary" alignment="centered">You dont have any goals! Add some to see them here.</Alert>
        : goals.map(goal => 
        <div key={`${goal.deliverable + goal.timeable + goal.goal}`} className="view-goals-row">
            <div className="view-goals-column">
                <Form.Control className="mb-2" as="input" type="text" onChange={handleOnChange} value={goal.goal} disabled aria-disabled/>
            </div>
            <div className="view-goals-column">
                <Form.Control className="mb-2" as="input" type="text" onChange={handleOnChange} value={goal.timeable} disabled aria-disabled/>
            </div>
            <InputGroup className="view-goals-column">
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    <Form.Control placeholder="Deliverable number here..." as="input" type="text" value={goal.deliverable} onChange={handleOnChange} disabled/>
            </InputGroup>
            <div className="view-goals-button-column">
                <Button variant="outline-danger" onClick={(e) => handleDeleteClick(e, goal)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </Button>
            </div>
        </div>
        )}
        {loading && <LoadingSpinner alignment="centered" variant="danger">Removing...</LoadingSpinner>}
        {!loading && goals.length > 0 && success && <Alert variant="primary" className="text-center mt-2">Goal deleted successfully.</Alert>}
        {!loading && goals.length > 0 && error && <Alert variant="danger" className="text-center mt-2">Failed to remove goal.</Alert>}
        </>
    )
}

export default ViewGoalForm;
