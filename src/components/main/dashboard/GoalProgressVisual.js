import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import {bullsEyeTargetIcon, checkMark} from '../../../constants/svg/svgs';
import { ORDER_KEY, REVENUE_KEY, WEEKLY_KEY } from '../../../constants/constants';
import Alert from 'react-bootstrap/Alert';

const GoalProgressVisual = ({goals, sumRevenue, numOrders}) => {

    const [goalsProgress, setGoalsProgress] = useState([]);

    useEffect(() => {
        if (goals.length > 0) {
            let goalItemArray = []
            for (const goal of goals) {
                let goalItem = {progress: 0, title: '', tag: '', complete: false}
                if (goal.timeable === WEEKLY_KEY) {
                    if (goal.goal === REVENUE_KEY) {
                        goalItem.progress = parseFloat((sumRevenue() / goal.deliverable).toFixed(2));
                        goalItem.title = `${goal.goal} - $${goal.deliverable}`;
                        goalItem.tag = REVENUE_KEY;
                    }
                    else {
                        goalItem.progress = parseFloat((numOrders() / goal.deliverable).toFixed(2));
                        goalItem.title = `${goal.goal} - ${goal.deliverable}`;
                        goalItem.tag = ORDER_KEY;
                    }

                    if (goalItem.progress >= 1.0) {
                        goalItem.complete = true;
                        goalItem.progress = 1;
                    }
                    goalItemArray.push(goalItem)
                }
            }
            setGoalsProgress(goalItemArray)
        }
    }, [goals, sumRevenue, numOrders]);

    return (
        <Card className="dashboard-card my-4 text-left">
            <Card.Header className="profile-header mb-2">
                <div className="dashboard-visual-wrapper">
                    <div className="visual-element">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#40c4ff" viewBox="0 0 16 16">
                            {bullsEyeTargetIcon.map(path => <path key={path} d={path} />)}
                        </svg>
                    </div>
                    <div className="visual-element" style={{justifyContent: "start"}} id="dashboard-visual-title">
                        <h2>Goals</h2>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                {
                goalsProgress.length === 0 ? <Alert variant="primary">You have not set any Weekly goals! Go to your profile to add and customize them.</Alert>
                : goalsProgress.map((goal, i) => <div key={goal.title} className="dashboard-goal-progress-bar">
                    <p>{goal.title}</p>
                    <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                            <LinearProgress variant="determinate" value={goal.progress * 100} color={i%2 === 0 ? "primary" : "secondary"}/>
                        </Box>
                    <Box minWidth="35">
                        { goal.progress < 1 ? `${Math.floor(goal.progress *100)}%`
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" viewBox="0 0 16 16">
                              <path d={checkMark}/>
                            </svg>}
                    </Box>
                    </Box>
                </div>)}
                {goalsProgress.length > 0 && <small className="text-info">*Some values may appear off target due to rounding. </small>}
            </Card.Body>
        </Card>
    )
}

export default GoalProgressVisual;
