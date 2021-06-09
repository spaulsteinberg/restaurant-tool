import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useUserContext } from '../../contexts/UserContext';
import LoadingSpinner from '../utility/LoadingSpinner';
import './auth-styles.scss';

const Login = () => {

    const initialState = {email: '', password: ''}
    const [form, setFormValues] = useState(initialState);
    const [error, setErrorState] = useState('');
    const [isLoading, setLoadState] = useState(false)
    const { login } = useAuth();
    const { setUserDataInLocalStorage } = useUserContext();
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
        if (!form.email || !form.password) {
            setLoadState(false)
            return setErrorState("Must provide an email and password")
        }
        try {
            await login(form.email, form.password);
            await setUserDataInLocalStorage(form.email)
            setLoadState(false)
            history.push("/")
        } catch (err) {
            console.log(err)
            setLoadState(false)
            setErrorState(`Login failed. Please try again.`)
        }
    }

    return (
        <React.Fragment>
            <Card className=" card-wrapper my-4" id="login">
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
                    <div className="text-center mb-2">
                        <Link exact={`${true}`} to="/forgot-password">Forgot Password?</Link>
                    </div>
                    {isLoading ? <LoadingSpinner alignment="center">Loading...</LoadingSpinner> : null}
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                </Form>
            </Card>
                <div className="w-100 text-center mt-2">
                    Dont have an account yet? <Link exact={`${true}`} to="/signup">Sign Up</Link>
                </div>
        </React.Fragment>
    )
}

export default Login;
