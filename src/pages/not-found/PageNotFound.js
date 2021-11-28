import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="text-center justify-content-center">
            <p>Page Not Found! <Link exact={`{true}`} to="/">Click here to go home</Link></p>
        </div>
    )
}

export default PageNotFound;
