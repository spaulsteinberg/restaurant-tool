import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import './auth-styles.scss';

const SignUp = () => {
    const initialState = { email: '', password: '', confirm: ''}
    const [form, setFormValues] = useState(initialState);
    const {signup} = useAuth();

    const handleInputChange = event => {
        let { name, value } = event.target;
        setFormValues({...form, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(form)
        return null;
    }
    return (
        <div className="card-wrapper">
            <Card className="my-4" id="sign-up">
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
                </Form>
            </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? Log In
                </div>
        </div>
    )
}

export default SignUp;
