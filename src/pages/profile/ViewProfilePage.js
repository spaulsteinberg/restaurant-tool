import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useUserContext } from '../../contexts/UserContext';
import ProfileGoalTransition from '../../components/main/profile/ProfileGoalTransition';
import ViewProfileReadOnlyDisplayEmail from '../../components/main/profile/ViewProfileReadOnlyDisplayEmail';
import ViewProfileFormBody from '../../components/main/profile/ViewProfileFormBody';
import ViewProfileHeader from '../../components/main/profile/ViewProfileHeader';

const ViewProfilePage = () => {
    const {currentUser} = useAuth();
    const {user, setOrCreateUserProfile, getUserFromProfile, userExistsInLocalStorage, profileError} = useUserContext();
    const [edit, setEdit] = useState(false);
    // if the user is not null/undefined, has keys and there is no error grabbing the profile have the current state be that user. else empty form
    const emptyFormState = {firstName: '', lastName: '', restaurant: '', title: ''}
    const initialState = user && Object.keys(user).length !== 0 && !profileError ? user : emptyFormState
    const [form, setFormState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showGoals, setShowGoals] = useState(false);
    const [fetchingProfileDirectly, setFetchingProfileDirectly] = useState(false);
    const [fetchProfileError, setFetchProfileError] = useState(false);

    const shouldFetchProfile = useCallback(() => {
        if (!userExistsInLocalStorage()) {
            setFetchingProfileDirectly(true)
            setFetchProfileError(false)
            getUserFromProfile(currentUser.uid, currentUser.email)
            .then(data => {
                data ? setFormState(data) : setFormState({firstName: '', lastName: '', restaurant: '', title: ''})
            })
            .catch(err => setFetchProfileError(true))
            .finally(() => setFetchingProfileDirectly(false))
        }
        // eslint-disable-next-line
    }, [currentUser.email, currentUser.uid])

    useEffect(() => {
        shouldFetchProfile()
    }, [shouldFetchProfile])

    const handleInputChange = event => {
        const {name, value} = event.target;
        setFormState({...form, [name]: value})
    }

    const handleCancelClick = () => {
        setFormState(initialState);
        setEdit(false);
    }
    
    const handleEditClick = async () => {
        setSuccess('');
        setError('');
        if (edit) {
            const requestObj = {
                ...user,
                firstName: form.firstName,
                restaurant: form.restaurant,
                email: currentUser.email,
                title: form.title,
                lastName: form.lastName,
            }
            if (JSON.stringify(requestObj) === JSON.stringify(initialState)) return setEdit(prevState => !prevState)
            try {
                setLoading(true);
                await setOrCreateUserProfile(requestObj, currentUser.uid)
                setSuccess('Profile edits saved successfully!')
            } catch (err) {
                setFormState(initialState);
                setError('Failed to save edits. Please try again.')
            } finally {
                setLoading(false)
            }
        }
        setEdit(prevState => !prevState);
    }

    const handleGoalsClick = () => {
        setShowGoals(prevState => !prevState);
    }

    const renderForm = () => {
        const formLabels = ["First Name: ", "Last Name: ", "Restaurant: ", "Title: "];
        const formKeys = ["firstName", "lastName", "restaurant", "title"]
        let formValuesToBind = [];
        for (let i = 0; i < formLabels.length; i++){
            formValuesToBind.push(
                <>
                    <div className="profile-label-col">
                        <Form.Label id={`view-${formKeys[i]}`} className="profile-label-text">{formLabels[i]}</Form.Label>
                    </div>
                    <div className="profile-control-col">
                        <Form.Control type="text" aria-labelledby={`view-${formKeys[i]}`} name={formKeys[i]} onChange={handleInputChange} value={form[formKeys[i]]} readOnly={!edit} />
                    </div>
                </>
            );
        }
        return formValuesToBind.map((k,i) => <div className="profile-form-row row mt-3" key={i}>{k}</div>);
    }
    return (
        <React.Fragment>
            <Card className="profile-card my-4 text-left">
                <ViewProfileHeader />
                <Card.Body>
                    <Form>
                        <ViewProfileReadOnlyDisplayEmail email={currentUser.email} />
                        <ViewProfileFormBody
                            user={user}
                            profileError={profileError}
                            renderForm={renderForm}
                            fetchingProfileDirectly={fetchingProfileDirectly}
                            fetchProfileError={fetchProfileError}
                            edit={edit}
                            loading={loading}
                            error={error}
                            success={success}
                            handleCancelClick={handleCancelClick}
                            handleEditClick={handleEditClick}
                        />
                    </Form>
                </Card.Body>
            </Card>
            <ProfileGoalTransition show={showGoals} handleGoalsClick={handleGoalsClick} />
        </React.Fragment>
    )
}

export default ViewProfilePage;
