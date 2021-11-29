import React from 'react'
import Goals from './Goals';
import { doubleDownArrow, doubleUpArrow } from '../../../constants/svg/svgs';

const ProfileGoalTransition = ({show, handleGoalsClick}) => {
    return (
        <React.Fragment>
            <div className="toggle-goals-container" onClick={handleGoalsClick}>
                <p className="text-primary" style={{ marginBottom: '.25rem' }}>{!show ? "Show Goals" : "Hide Goals"}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0d6efd" viewBox="0 0 16 16" className="centered-item">
                    {!show
                        ? doubleDownArrow.map(path => <path fillRule="evenodd" key={path} d={path} />)
                        : doubleUpArrow.map(path => <path fillRule="evenodd" key={path} d={path} />)}
                </svg>
            </div>
            {show && <Goals />}
        </React.Fragment>
    )
}

export default ProfileGoalTransition
