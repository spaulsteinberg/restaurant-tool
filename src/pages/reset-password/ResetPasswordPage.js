import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../contexts/AuthContext';
import AuthHeader from '../../components/auth/AuthHeader';
import ResetPasswordForm from '../../components/auth/reset-password/ResetPasswordForm';

const ResetPasswordPage = () => {

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
                <AuthHeader headerText="Reset Password" />
                <ResetPasswordForm 
                    email={email} 
                    isLoading={isLoading} 
                    error={error} 
                    success={success} 
                    handleInputChange={handleInputChange} 
                    handleSubmit={handleSubmit} />
            </Card>
        </div>
    )
}

export default ResetPasswordPage;
