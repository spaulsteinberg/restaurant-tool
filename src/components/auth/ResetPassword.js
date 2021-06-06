import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../utility/LoadingSpinner';
import './auth-styles.scss';

const ResetPassword = () => {

    const [email, setEmailValue] = useState('');
    const [error, setErrorState] = useState('');
    const [success, setSuccessState] = useState('');
    const [isLoading, setLoadState] = useState(false);
    const { resetPassword } = useAuth();

    const handleInputChange = event => {
        setEmailValue(event.target.value)
    }

    // redirect to dash on success
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadState(true);
        setErrorState('');
        setSuccessState('')
        if (!email) {
            setLoadState(false)
            return setErrorState("Must provide an email")
        }
        try {
            await resetPassword(email);
            setLoadState(false)
            setSuccessState("Reset instructions sent to inbox.")
        } catch (err) {
            setLoadState(false)
            setErrorState(`Failed to reset password.`)
        }
    }

    return (
        <div className="card-wrapper">
            <Card className="my-4" id="reset-password">
                <Card.Body>
                    <h2 className="text-center mb-2">Reset Password</h2>
                </Card.Body>
                <Form className="mx-4">
                    <Form.Group id="email-group">
                        <Form.Label id="email">Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            aria-labelledby="email" 
                            name="email" 
                            value={email} 
                            onChange={handleInputChange}
                            required/>
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit" className="w-100 my-3" variant="primary" onClick={handleSubmit}>Reset</Button>
                    </div>
                    <div className="text-center mb-2">
                        <Link exact={`${true}`} to="/login">Back to Login</Link>
                    </div>
                    {isLoading ? <LoadingSpinner alignment="center">Loading...</LoadingSpinner> : null}
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    {success && <Alert variant="success" className="text-center">{success}</Alert>}
                </Form>
            </Card>
                <div className="w-100 text-center">
                    Dont have an account yet? <Link exact={`${true}`} to="/signup">Sign Up</Link>
                </div>
        </div>
    )
}

export default ResetPassword;
