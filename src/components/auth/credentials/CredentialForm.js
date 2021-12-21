import React from 'react'
import AuthLoadingStateSpinner from '..//AuthLoadingStateSpinner';
import AuthSubmitButton from '../AuthSubmitButton';
import AuthErrorState from '../AuthErrorState';
import CredentialFormInputs from './CredentialFormInputs';
import Form from 'react-bootstrap/Form';

const CredentialForm = ({form, isLoading, error, handleInputChange, handleSubmit, placeholderText}) => {
    return (
        <Form className="mx-4">
            <CredentialFormInputs form={form} handleInputChange={handleInputChange} placeholderText={placeholderText} />
            <AuthSubmitButton margin="my-3" width={100} variant="warning" handleSubmit={handleSubmit}>Update</AuthSubmitButton>
            <AuthLoadingStateSpinner isLoading={isLoading} loadText="Updating..." />
            <AuthErrorState error={error} />
        </Form>
    )
}

export default CredentialForm
