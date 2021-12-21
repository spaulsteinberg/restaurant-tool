import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useUserContext } from '../../contexts/UserContext';
import AuthHeader from '../../components/auth/AuthHeader';
import '../../components/auth/auth-styles.scss';
import LoginForm from '../../components/auth/login/LoginForm';

const Login = () => {

    const initialState = { email: '', password: '' }
    const [form, setFormValues] = useState(initialState);
    const [error, setErrorState] = useState('');
    const [isLoading, setLoadState] = useState(false)
    const { login } = useAuth();
    const { getUserFromProfile } = useUserContext();
    const history = useHistory();

    const handleInputChange = event => {
        let { name, value } = event.target;
        setFormValues({ ...form, [name]: value })
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
            let [uid, email] = await login(form.email, form.password);
            await getUserFromProfile(uid, email);
            setLoadState(false)
            history.push("/")
        } catch (err) {
            setLoadState(false)
            setErrorState(`Login failed. Please try again.`)
        }
    }

    return (
        <React.Fragment>
            <Card className="card-wrapper my-4" id="login">
                <AuthHeader headerText="Login" />
                <LoginForm form={form} isLoading={isLoading} error={error} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            </Card>
        </React.Fragment>
    )
}

export default Login;
