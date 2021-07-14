import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addIcon } from '../../../constants/svg/svgs';

const NewGoalForm = () => {
    
    const handleGoalSelectChange = (event, key) => {
        event.preventDefault();
        let {value} = event.target;
        key === "goal" ? setNewGoal({...newGoal, goal: value}) : key === "time" ? setNewGoal({...newGoal, timeable: value}) : setNewGoal({...newGoal, deliverable: value})
    }

    const handleNewGoalSubmit = e => {
        e.preventDefault();
        console.log("hi")
    }

    const [newGoal, setNewGoal] = useState({goal: '', timeable: '', deliverable: ''})

    return (
        <Form onSubmit={handleNewGoalSubmit}>
            <Form.Control className="mb-4" as="select" defaultValue={'default'} onChange={(e) => handleGoalSelectChange(e, "goal")}>
                <option value="default" disabled>Choose a New Goal...</option>
                <option value="Revenue">Revenue</option>
                <option value="Orders">Orders</option>
            </Form.Control>
            <Form.Control className="mb-4" as="select" defaultValue={'default'} onChange={(e) => handleGoalSelectChange(e, "time")}>
                <option value="default" disabled>Choose a New Timeable...</option>
                <option value="1 week">Weekly</option>
                <option value="30 days">Monthly</option>
                <option value="1 year">Yearly</option>
            </Form.Control>
            <Form.Control className="mb-4" placeholder="Deliverable number here..." as="input" type="number" max={100000} min={0} value={newGoal.deliverable} onChange={(e) => handleGoalSelectChange(e, "deliver")}/>
            <Button type="submit" variant="success">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                    {addIcon.map(path => <path key={path} d={path} />)}
                </svg>
            </Button>
        </Form>
    )
}

export default NewGoalForm;
