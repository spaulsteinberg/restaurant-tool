import React from 'react'
import { Link } from 'react-router-dom';

const AuthLink = ({containerClasses, toLink, toLinkText}) => {
    return (
        <div className={containerClasses}>
            <Link exact={`${true}`} to={toLink}>{toLinkText}</Link>
        </div>
    )
}

export default AuthLink
