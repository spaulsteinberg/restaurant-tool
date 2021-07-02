import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../utility/LoadingSpinner';
import { EMAIL_REGEX } from '../../../constants/constants'
import '../main-styles.scss';
import { useUserContext } from '../../../contexts/UserContext';

const UpdateCredentials = () => {

    const { currentUser, updateEmail, updatePassword } = useAuth();
    const { updateUserContextEmail } = useUserContext();
    const initialState = { email: currentUser.email, password: '', confirm: ''}
    const [form, setFormValues] = useState(initialState);
    const [error, setErrorState] = useState('');
    const [isLoading, setLoadState] = useState(false);
    const history = useHistory();
    const placeholderText = "Leave blank to keep the same"

    const handleInputChange = event => {
        let { name, value } = event.target;
        setFormValues({...form, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorState('');
        if (form.password !== form.confirm) {
            return setErrorState("Passwords do not match.")
        }

        if (!EMAIL_REGEX.test(form.email)) {
            return setErrorState("Email is not valid")
        }

        if (form.password && form.password.length < 6) {
            return setErrorState("Password must be at least 6 characters.")
        }

        // set load state after the initial checks
        setLoadState(true)
        const promisesToResolve = [];
        let shouldChangeEmailContext = false;
        if (form.email !== currentUser.email) {
            promisesToResolve.push(updateEmail(form.email))
            shouldChangeEmailContext = true;
        }
        if (form.password) {
            promisesToResolve.push(updatePassword(form.password))
        }

        Promise.all(promisesToResolve)
        .then(() => {
            setLoadState(false)
            shouldChangeEmailContext && updateUserContextEmail(form.email, currentUser.uid)
            history.push("/")
        })
        .catch(err => {
            setLoadState(false)
            setErrorState("Failed to update Account.")
        })
    }

    return (
        <React.Fragment>
            <Card className="card-wrapper alignTextLeft my-4">
                <Card.Body>
                    <h2 className="text-center mb-2">Update Credentials</h2>
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
                            placeholder={placeholderText}
                            />
                    </Form.Group>
                    <Form.Group id="password-confirm-group">
                        <Form.Label id="password-confirm">Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            aria-labelledby="password-confirm" 
                            name="confirm" 
                            value={form.confirm}
                            onChange={handleInputChange}
                            placeholder={placeholderText}
                            />
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit" className="w-100 my-3" variant="warning" onClick={handleSubmit}>Update</Button>
                    </div>
                    {isLoading ? <LoadingSpinner alignment="center">Updating...</LoadingSpinner> : null}
                    {error && <Alert variant="danger" className="text-center">{error} Try logging out and logging in to try again.</Alert>}
                </Form>
            </Card>
                <div className="w-100 text-center mt-2">
                    Click <Link exact={`${true}`} to="/profile/signup">here</Link> to sign up a new user.
                </div>
        </React.Fragment>
    )
}

export default UpdateCredentials;