import React from 'react'
import Button  from 'react-bootstrap/Button';

const SignUpButton = ({ handleSubmit }) => {
    return (
        <div className="text-center mx-4">
            <Button type="submit" className="w-100 my-3" variant="primary" onClick={handleSubmit}>Sign Up</Button>
        </div>
    )
}

export default SignUpButton
