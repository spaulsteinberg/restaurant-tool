import React from 'react'
import AuthFormInput from '../AuthFormInput'

const CredentialFormInputs = ({form, handleInputChange, placeholderText}) => {
    return (
        <React.Fragment>
            <AuthFormInput
                value={form.email}
                name="email"
                type="email"
                aria-labelledby="email"
                onChange={handleInputChange}
                labelText="Email"
                required groupId="email-group"
                labelId="email" />
            <AuthFormInput
                value={form.password}
                name="password"
                type="password"
                aria-labelledby="password"
                onChange={handleInputChange}
                placeholder={placeholderText}
                labelText="Password"
                groupId="password-group"
                labelId="password" />
            <AuthFormInput 
                type="password"
                aria-labelledby="password-confirm"
                name="confirm"
                value={form.confirm}
                onChange={handleInputChange}
                placeholder={placeholderText}
                labelText="Confirm Password"
                groupId="password-confirm-group"
                labelId="password-confirm" />
        </React.Fragment>
    )
}

export default CredentialFormInputs
