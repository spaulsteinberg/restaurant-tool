import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import { GOAL_TYPES, REVENUE_KEY } from '../../../constants/constants';
import { addIcon } from '../../../constants/svg/svgs';
import { addNewGoal } from '../../../redux/goals/goalActions';
import LoadingSpinner from '../../utility/LoadingSpinner';

const NewGoalForm = ({dispatch, user, hasCol, goals}) => {

    const {loading, success, error} = useSelector(state => state.goals.add);
    
    const [newGoal, setNewGoal] = useState({goal: '', timeable: '', deliverable: ''});
    const [formError, setFormError] = useState('');
    //const [goalsAvailable, setGoalsAvailable] = useState(GOAL_TYPES.SUBJECTS)
    //need to keep track of combinations
    
    const [gKey, tKey, dKey] = ["goal", "time", "deliver"]

    const handleGoalSelectChange = (event, key) => {
        event.preventDefault();
        let {value} = event.target;
        key === gKey ? setNewGoal({...newGoal, goal: value}) : key === tKey ? setNewGoal({...newGoal, timeable: value}) : setNewGoal({...newGoal, deliverable: value})
    }

    const handleNewGoalSubmit = async (e) => {
        e.preventDefault();
        if(!validate()) return;
        setFormError('');
        newGoal.deliverable = parseInt(newGoal.deliverable)
        await dispatch(addNewGoal(user.email, newGoal, hasCol))
    }

    const validate = () => {
        if (newGoal.goal === '' || newGoal.timeable === '' || newGoal.deliverable === ''){
            setFormError('Must fill out the entire form');
            return false;
        }
        if (isNaN(newGoal.deliverable)){
            setFormError('Invalid deliverable number')
            return false;
        }
        if (goals.length >= process.env.REACT_APP_MAX_GOAL_LENGTH){
            setFormError('Exceeded max number of allowed goals (8).')
            return false;
        }
        return true;
    }

    return (
        <>
            <Form onSubmit={handleNewGoalSubmit}>
                <Form.Control className="mb-4" as="select" defaultValue={'default'} onChange={(e) => handleGoalSelectChange(e, gKey)} required>
                    <option value="default" disabled>Choose a New Goal...</option>
                    {GOAL_TYPES.SUBJECTS.map(val => <option value={val} key={val}>{val}</option>)}
                </Form.Control>
                <Form.Control className="mb-4" as="select" defaultValue={'default'} onChange={(e) => handleGoalSelectChange(e, tKey)}>
                    <option value="default" disabled>Choose a New Timeable...</option>
                    {GOAL_TYPES.TIMEABLES.map(time => <option value={time} key={time}>{time}</option>)}
                </Form.Control>
                <InputGroup className="mb-4">
                    {newGoal.goal === REVENUE_KEY && <InputGroup.Text>$</InputGroup.Text>}
                    <Form.Control placeholder="Deliverable number here..." as="input" type="number" max={100000} min={1} value={newGoal.deliverable} onChange={(e) => handleGoalSelectChange(e, dKey)}/>
                </InputGroup>
                <Button type="submit" variant="success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">{addIcon.map(path => <path key={path} d={path} />)}</svg>
                </Button>
                <div style={{display: formError ? "block" : "none", marginTop: '1rem'}}>
                    <Alert variant="danger" className="text-center">{formError}</Alert>
                </div>
            </Form>
            <div style={{display: !formError ? "block" : "none", marginTop: '1rem'}}>
                {loading && <LoadingSpinner alignment="center">Adding...</LoadingSpinner>}
                {success && <Alert variant="success" className="text-center">Goal added successfully!</Alert>}
                {error && <Alert variant="danger" className="text-center">An error occurred. Please try again.</Alert>}
            </div>
    </>
    )
}

export default NewGoalForm;
