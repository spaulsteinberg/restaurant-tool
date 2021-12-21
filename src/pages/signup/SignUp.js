import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {EMAIL_REGEX} from '../../constants/constants';
import '../../components/auth/auth-styles.scss';
import { useUserContext } from '../../contexts/UserContext';
import SignUpForm from '../../components/auth/signup/SignUpForm';
import SignUpButton from '../../components/auth/signup/SignUpButton';
import SignUpFooter from '../../components/auth/signup/SignUpFooter';
import SignUpPermissions from '../../components/auth/signup/SignUpPermissions';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/globalActionTypes';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthLoadingStateSpinner from '../../components/auth/AuthLoadingStateSpinner';
import AuthErrorState from '../../components/auth/AuthErrorState';

const SignUp = () => {

    const initialState = { email: '', password: '', confirm: ''}
    const [form, setFormValues] = useState(initialState);
    const [optionalPermissions, setOptionalPermissons] = useState({write: false, admin: false})
    const [error, setErrorState] = useState('');
    const [isLoading, setLoadState] = useState(false);
    const { signup, logout } = useAuth();
    const { clearUserDataFromLocalStorage } = useUserContext();
    const history = useHistory();
    const dispatch = useDispatch()

    const handleInputChange = event => {
        let { name, value } = event.target;
        setFormValues({...form, [name]: value})
    }

    const handleCheckChange = event => {
        const { name, checked } = event.target;
        setOptionalPermissons({...optionalPermissions, [name]: checked})
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
            await signup(form.email, form.password, optionalPermissions);
            await logout();
            dispatch(userLogout())
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
                <AuthHeader headerText="Sign Up" />
                <SignUpForm form={form} handleInputChange={handleInputChange} />
                <SignUpPermissions write={optionalPermissions.write} admin={optionalPermissions.admin} handleChange={handleCheckChange}/>
                <SignUpButton handleSubmit={handleSubmit} />
                <AuthLoadingStateSpinner isLoading={isLoading} loadText="Loading..." />
                <AuthErrorState error={error} margin="mx-4" />
            </Card>
            <SignUpFooter />
        </React.Fragment>
    )
}

export default SignUp;
