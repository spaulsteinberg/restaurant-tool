import React from 'react';
import Card from 'react-bootstrap/Card';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import {bullsEyeTargetIcon} from '../../../constants/svg/svgs';

const GoalProgressVisual = () => {
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
                    Goal 1
                <Box display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate" value={78} />
                    </Box>
                    <Box minWidth="35">
                        78%
                    </Box>
                </Box>
            </Card.Body>
        </Card>
    )
}

export default GoalProgressVisual;
