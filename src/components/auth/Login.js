import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../utility/LoadingSpinner';
import './auth-styles.scss';

const Login = () => {

    const initialState = {email: '', password: ''}
    const [form, setFormValues] = useState(initialState);
    const [error, setErrorState] = useState('');
    const [isLoading, setLoadState] = useState(false)
    const { login } = useAuth();
    const history = useHistory();

    const handleInputChange = event => {
        let { name, value } = event.target;
        setFormValues({...form, [name]: value})
    }

    // redirect to dash on success
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadState(true);
        setErrorState('');
        try {
            await login(form.email, form.password);
            history.push("/")
        } catch (err) {
            setErrorState(`Login failed. Please try again.`)
        }
        return setLoadState(false)
    }

    return (
        <div className="card-wrapper">
            <Card className="my-4" id="sign-up">
                <Card.Body>
                    <h2 className="text-center mb-2">Login</h2>
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
                    <div className="text-center">
                        <Button type="submit" className="w-100 my-3" variant="primary" onClick={handleSubmit}>Login</Button>
                    </div>
                    {isLoading ? <LoadingSpinner alignment="center">Loading...</LoadingSpinner> : null}
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                </Form>
            </Card>
                <div className="w-100 text-center mt-2">
                    Dont have an account yet? <Link exact to="/signup">Sign Up</Link>
                </div>
        </div>
    )
}

export default Login;
