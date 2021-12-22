import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { EMAIL_REGEX } from '../../constants/constants'
import useRoles from '../../hooks/useRoles';
import NewUserSignup from '../../components/auth/credentials/NewUserSignup';
import Disclaimer from '../../components/utility/Disclaimer';
import AuthHeader from '../../components/auth/AuthHeader';
import CredentialForm from '../../components/auth/credentials/CredentialForm';
import { updateUserEmailOnUser } from '../../api/userApi';
import { setPermissionsEmail } from '../../redux/permissions/permissionActions';
import { useDispatch } from 'react-redux';


const UpdateCredentialsPage = () => {

    const { currentUser, updateEmail, updatePassword } = useAuth();
    const initialState = { email: currentUser.email, password: '', confirm: '' }
    const [form, setFormValues] = useState(initialState);
    const [error, setErrorState] = useState('');
    const [isLoading, setLoadState] = useState(false);
    const history = useHistory();
    const roles = useRoles()
    const dispatch = useDispatch()
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
            promisesToResolve.push(updateUserEmailOnUser(currentUser.uid, form.email))
        }

        Promise.all(promisesToResolve)
            .then(() => {
                setLoadState(false)
                dispatch(setPermissionsEmail(form.email))
                history.push("/")
            })
            .catch(err => {
                console.log(err)
                setLoadState(false)
                setErrorState(`Failed to update Account. -- ${err?.message}`)
            })
    }

    return (
        <React.Fragment>
            <Card className="card-wrapper alignTextLeft my-4">
                <AuthHeader headerText="Update Credentials" />
                <Disclaimer classes="text-center text-info px-1">*Only one credential will be changed at a time. Passwords have priority over email. If you would like to update both, come back to this page.</Disclaimer>
                <CredentialForm form={form} isLoading={isLoading} error={error} handleInputChange={handleInputChange} handleSubmit={handleSubmit} placeholderText={placeholderText} />
            </Card>
            <NewUserSignup canSignUpUser={roles?.admin} />
        </React.Fragment>
    )
}

export default UpdateCredentialsPage;