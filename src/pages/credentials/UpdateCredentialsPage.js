import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { EMAIL_REGEX } from '../../constants/constants'
import { useUserContext } from '../../contexts/UserContext';
import useRoles from '../../hooks/useRoles';
import NewUserSignup from '../../components/auth/credentials/NewUserSignup';
import CredentialsHeader from '../../components/auth/credentials/CredentialsHeader';
import CredentialFormInputs from '../../components/auth/credentials/CredentialFormInputs';
import CredentialUpdateButton from '../../components/auth/credentials/CredentialUpdateButton';
import CredentialLoadingState from '../../components/auth/credentials/CredentialLoadingState';
import CredentialErrorState from '../../components/auth/credentials/CredentialErrorState';
import Disclaimer from '../../components/utility/Disclaimer';

const UpdateCredentialsPage = () => {

    const { currentUser, updateEmail, updatePassword } = useAuth();
    const { updateUserContextEmail } = useUserContext();
    const initialState = { email: currentUser.email, password: '', confirm: '' }
    const [form, setFormValues] = useState(initialState);
    const [error, setErrorState] = useState('');
    const [isLoading, setLoadState] = useState(false);
    const history = useHistory();
    const roles = useRoles()
    const placeholderText = "Leave blank to keep the same"

    const handleInputChange = event => {
        let { name, value } = event.target;
        setFormValues({ ...form, [name]: value })
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
        let passChange = false

        if (form.password) {
            passChange = true
            promisesToResolve.push(updatePassword(form.password))
        }

        if (!passChange && form.email !== currentUser.email) {
            promisesToResolve.push(updateEmail(form.email))
            promisesToResolve.push(updateUserContextEmail(form.email, currentUser.uid))
        }

        Promise.all(promisesToResolve)
            .then(() => {
                setLoadState(false)
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
                <CredentialsHeader />
                <Disclaimer classes="text-center text-info px-1">*Only one credential will be changed at a time. Passwords have priority over email. If you would like to update both, come back to this page.</Disclaimer>
                <Form className="mx-4">
                    <CredentialFormInputs form={form} handleInputChange={handleInputChange} placeholderText={placeholderText} />
                    <CredentialUpdateButton handleSubmit={handleSubmit} />
                    <CredentialLoadingState isLoading={isLoading} />
                    <CredentialErrorState error={error} />
                </Form>
            </Card>
            <NewUserSignup canSignUpUser={roles?.admin} />
        </React.Fragment>
    )
}

export default UpdateCredentialsPage;