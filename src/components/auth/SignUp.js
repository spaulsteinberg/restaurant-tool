import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../utility/LoadingSpinner';
import {EMAIL_REGEX} from '../../constants/constants';
import './auth-styles.scss';
import { useUserContext } from '../../contexts/UserContext';

const SignUp = () => {

    const initialState = { email: '', password: '', confirm: ''}
    const [form, setFormValues] = useState(initialState);
    const [error, setErrorState] = useState('');
    const [isLoading, setLoadState] = useState(false);
    const { signup, logout } = useAuth();
    const { clearUserDataFromLocalStorage } = useUserContext();
    const history = useHistory();

    const handleInputChange = event => {
        let { name, value } = event.target;
        setFormValues({...form, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadState(true)
        setErrorState('')
        if (form.password !== form.confirm) {
            setLoadState(false);
            return setErrorState("Passwords do not match.")
        }
        if (!EMAIL_REGEX.test(form.email)) {
            setLoadState(false);
            return setErrorState("Email is not valid")
        }
        if (form.password.length < 6) {
            setLoadState(false);
            return setErrorState("Password must be at least 6 characters long.")
        }
        try {
            setErrorState('');
            await signup(form.email, form.password);
            await logout();
            clearUserDataFromLocalStorage();
            history.push('/login');
        } catch (err) {
            setLoadState(false)
            setErrorState(`Account creation failed.`)
        }
    }

    return (
        <React.Fragment>
            <Card className="card-wrapper my-4" id="sign-up">
                <Card.Body>
                    <h2 className="text-center mb-2">Sign Up</h2>
                </Card.Body>
                <Form className="mx-4">
                    <Form.Group id="email-group">
                        <Form.Label id="email">Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            aria-labelledby="email" 
                            name="email" 
                            value={form.email} 
                            onChange={handleInputChange}
                            required/>
                    </Form.Group>
                    <Form.Group id="password-group">
                        <Form.Label id="password">Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            aria-labelledby="password" 
                            name="password" 
                            value={form.password}
                            onChange={handleInputChange}
                            required />
                    </Form.Group>
                    <Form.Group id="password-confirm-group">
                        <Form.Label id="password-confirm">Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            aria-labelledby="password-confirm" 
                            name="confirm" 
                            value={form.confirm}
                            onChange={handleInputChange}
                            required/>
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit" className="w-100 my-3" variant="primary" onClick={handleSubmit}>Sign Up</Button>
                    </div>
                    {isLoading ? <LoadingSpinner alignment="center">Loading...</LoadingSpinner> : null}
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                </Form>
            </Card>
                <div className="w-100 text-center mt-2">
                    Not where you want to be? Click here to go back to the <Link exact={`${true}`} to="/dashboard">dashboard</Link>.
                    <p className="text-danger">*On a successful sign up, your current session will be ended.</p>
                </div>
        </React.Fragment>
    )
}

export default SignUp;
