import React from 'react'
import AuthLoadingStateSpinner from '../AuthLoadingStateSpinner';
import AuthSubmitButton from '../AuthSubmitButton';
import Form from 'react-bootstrap/Form';
import AuthErrorState from '../AuthErrorState';
import AuthFormInput from '../AuthFormInput';
import AuthLink from '../AuthLink';

const LoginForm = ({form, isLoading, error, handleInputChange, handleSubmit}) => {
    return (
        <Form className="mx-4">
            <AuthFormInput
                type="email"
                aria-labelledby="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                labelText="Email"
                labelId="email"
                groupId="email-group"
                required />
            <AuthFormInput
                type="password"
                aria-labelledby="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                labelText="Password"
                labelId="password"
                groupId="password-group"
                required />
            <AuthSubmitButton margin="my-3" width={100} variant="primary" handleSubmit={handleSubmit}>Login</AuthSubmitButton>
            <AuthLink containerClasses="text-center mb-2" toLink="/forgot-password" toLinkText="Forgot Password?" />
            <AuthLoadingStateSpinner isLoading={isLoading} loadText="Logging in..." />
            <AuthErrorState error={error} />
        </Form>
    )
}

export default LoginForm
