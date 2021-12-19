import React from 'react'
import { Link } from 'react-router-dom';

const SignUpFooter = () => {
    return (
        <div className="w-100 text-center mt-2">
                    Not where you want to be? Click here to go back to the <Link exact={`${true}`} to="/dashboard">dashboard</Link>.
                    <p className="text-danger">*On a successful sign up, your current session will be ended.</p>
                </div>
    )
}

export default SignUpFooter
