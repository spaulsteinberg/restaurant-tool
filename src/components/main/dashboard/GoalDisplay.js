import React from 'react'
import Alert from 'react-bootstrap/Alert';
import GoalProgressVisual from './GoalProgressVisual';
import LoadingSpinner from '../../utility/LoadingSpinner';


const GoalDisplay = ({goals, numOrders, sumRevenue}) => {
    return (
        <React.Fragment>
            {goals.get.loading ? 
                <LoadingSpinner alignment="center">Retrieving Goals...</LoadingSpinner> :
                goals.get.error ? <Alert variant="danger" className="text-center mt-2">Could not load goals.</Alert>:
                <div className="dashboard-body-item goals-dashboard-element">
                    <GoalProgressVisual goals={goals.goalsList} numOrders={numOrders} sumRevenue={sumRevenue}/>
                </div>
            }
        </React.Fragment>
    )
}

export default GoalDisplay;
