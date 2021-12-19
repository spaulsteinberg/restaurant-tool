import React from 'react'
import { Link } from 'react-router-dom';

const SignupLink = () => {
    return (
        <div className="w-100 text-center mt-2">
            Click <Link exact={`${true}`} to="/profile/signup">here</Link> to sign up a new user.
        </div>
    )
}

export default SignupLink
