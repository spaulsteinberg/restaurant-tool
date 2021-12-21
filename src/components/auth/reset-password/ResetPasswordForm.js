import React from 'react'
import Form from 'react-bootstrap/Form';
import AuthErrorState from '../AuthErrorState';
import AuthFormInput from '../AuthFormInput';
import AuthLoadingStateSpinner from '../AuthLoadingStateSpinner';
import AuthSubmitButton from '../AuthSubmitButton';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import AuthLink from '../AuthLink';

const ResetPasswordForm = ({email, isLoading, success, error, handleInputChange, handleSubmit}) => {
    return (
        <Form className="mx-4">
            <AuthFormInput
                type="email"
                aria-labelledby="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                labelText="Email"
                labelId="email"
                groupId="email-group"
                required />
            <AuthSubmitButton margin="my-3" width={100} variant="primary" handleSubmit={handleSubmit}>Reset</AuthSubmitButton>
            <AuthLink containerClasses="text-center mb-2" toLink="/login" toLinkText="Back To Login" />
            <AuthLoadingStateSpinner isLoading={isLoading} loadText="Loading..." />
            <AuthErrorState error={error} />
            <ResetPasswordSuccess success={success} />
        </Form>
    )
}

export default ResetPasswordForm
