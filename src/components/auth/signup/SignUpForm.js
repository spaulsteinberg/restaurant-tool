import React from 'react'
import Form from 'react-bootstrap/Form';
import AuthFormInput from '../AuthFormInput';

const SignUpForm = ({ form, handleInputChange }) => {
    return (
        <Form className="mx-4">
            <AuthFormInput
                type="email"
                aria-labelledby="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
                labelText="Email"
                labelId="email"
                groupId="email-group" />
            <AuthFormInput 
                type="password"
                aria-labelledby="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                required
                labelText="Password"
                labelId="password"
                groupId="password-group"/>
            <AuthFormInput
                type="password"
                aria-labelledby="password-confirm"
                name="confirm"
                value={form.confirm}
                onChange={handleInputChange}
                required
                labelText="Confirm Password"
                labelId="password-confirm"
                groupId="password-confirm-group" />
        </Form>
    )
}

export default SignUpForm
