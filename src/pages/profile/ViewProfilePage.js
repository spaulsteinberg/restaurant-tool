import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '../../contexts/AuthContext';
import { useUserContext } from '../../contexts/UserContext';
import LoadingSpinner from '../../components/utility/LoadingSpinner';
import { pencilEditIconPath, checkMarkSavePath, circleSlashForCancelPaths, doubleDownArrow, doubleUpArrow } from '../../constants/svg/svgs';
import Goals from '../../components/main/profile/Goals';

const ViewProfilePage = () => {
    const {currentUser} = useAuth();
    const {user, setOrCreateUserProfile, getUserFromProfile, userExistsInLocalStorage, profileError} = useUserContext();
    const [edit, setEdit] = useState(false);
    // if the user is not null/undefined, has keys and there is no error grabbing the profile have the current state be that user. else empty form
    const emptyFormState = {firstName: '', lastName: '', restaurant: '', role: ''}
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
                data ? setFormState(data) : setFormState({firstName: '', lastName: '', restaurant: '', role: ''})
            })
            .catch(err => setFetchProfileError(true))
            .finally(() => setFetchingProfileDirectly(false))
        }
    }, [currentUser.email, currentUser.uid, getUserFromProfile, userExistsInLocalStorage])

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
                firstName: form.firstName,
                restaurant: form.restaurant,
                email: currentUser.email,
                role: form.role,
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
        const formLabels = ["First Name: ", "Last Name: ", "Restaurant: ", "Role: "];
        const formKeys = ["firstName", "lastName", "restaurant", "role"]
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
            <Card.Header className="profile-header mb-2">
                <h2>My Profile</h2>
            </Card.Header>
            <Card.Body>
                <Form>
                    <div className="profile-form-row row">
                        <div className="profile-label-col">
                            <Form.Label id="view-email" className="profile-label-text">Email: </Form.Label>
                        </div>
                        <div className="profile-control-col">
                            <Form.Control type="text" aria-labelledby="view-email" value={currentUser.email} readOnly/>
                        </div>
                    </div>
                    {fetchingProfileDirectly ? <LoadingSpinner alignment="centered" marginTop="1rem">Fetching Profile...</LoadingSpinner>
                        : fetchProfileError ? <Alert variant="danger" className="mt-4">Could not fetch profile. Please reload and try again.</Alert>
                        : user && !profileError ? <React.Fragment>
                            {renderForm()}
                            <Button variant={!edit ? "warning" : "success"} className="btn mt-3 mb-2 mx-1" onClick={handleEditClick}>
                                { !edit ? <svg xmlns="http://www.w3.org/2000/svg" 
                                    width="16" height="16" fill="black" viewBox="0 0 16 16">
                                    <path d={pencilEditIconPath}/>
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" 
                                    width="16" height="16" fill="white" viewBox="0 0 16 16">
                                    <path d={checkMarkSavePath}/>
                                </svg>}
                            </Button>
                            {edit && 
                            <Button variant="danger" className="mt-3 mb-2 mx-1" onClick={handleCancelClick}>
                                {circleSlashForCancelPaths}
                            </Button>}
                            {loading && 
                                <div className="profile-form-state-div">
                                    <LoadingSpinner alignment="center">Updating...</LoadingSpinner>
                                </div>
                            }
                            {error && 
                                <div className="profile-form-state-div">
                                    <Alert variant="danger">{error}</Alert>
                                </div>
                            }
                            {success && 
                                <div className="profile-form-state-div">
                                    <Alert variant="success">{success}</Alert>
                                </div>
                            }
                        </React.Fragment>
                        : <Alert variant="danger" className="mt-4">Could not load profile. Please reload and try again.</Alert>
                    }
                </Form>
            </Card.Body>
        </Card>
            <div className="toggle-goals-container" onClick={handleGoalsClick}>
                <p className="text-primary" style={{marginBottom: '.25rem'}}>{!showGoals ? "Show Goals" : "Hide Goals"}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0d6efd" viewBox="0 0 16 16" style={{margin: '0 auto'}}>
                    { !showGoals 
                        ? doubleDownArrow.map(path => <path fillRule="evenodd" key={path} d={path} />)
                        : doubleUpArrow.map(path => <path fillRule="evenodd" key={path} d={path} />)}
                </svg>
            </div>
            {showGoals && <Goals />}
        </React.Fragment>
    )
}

export default ViewProfilePage;
