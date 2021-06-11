import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserContext } from '../../../contexts/UserContext';
import '../main-styles.scss';
import { Button } from 'react-bootstrap';
import { pencilEditIconPath, checkMarkSavePath, circleSlashForCancelPaths } from '../../../constants/svg/svgs';

const ViewProfile = () => {
    const {currentUser} = useAuth();
    const {user, setOrCreateUserProfile, profileError} = useUserContext();
    const [edit, setEdit] = useState(false);
    // if the user is not null/undefined, has keys and there is no error grabbing the profile have the current state be that user. else empty form
    const initialState = user && Object.keys(user).length !== 0 && !profileError ? user : {FirstName: '', LastName: '', Restaurant: '', Role: ''}
    const [form, setFormState] = useState(initialState)

    const handleInputChange = event => {
        const {name, value} = event.target;
        setFormState({...form, [name]: value})
    }

    const handleCancelClick = () => {
        setFormState(initialState);
        setEdit(false);
    }
    
    const handleEditClick = async () => {
        if (edit) {
            const requestObj = {
                FirstName: form.FirstName,
                LastName: form.LastName,
                Restaurant: form.Restaurant,
                Role: form.Role
            }
            try {
                console.log(requestObj)
                await setOrCreateUserProfile(requestObj, currentUser.email)
            } catch (err) {
                console.log(err)
            }
        }
        setEdit(prevState => !prevState);
    }
    return (
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
                        { user && !profileError ? <React.Fragment>
                            <div className="profile-form-row row mt-3">
                                <div className="profile-label-col">
                                    <Form.Label id="view-firstname" className="profile-label-text">First Name: </Form.Label>
                                </div>
                                <div className="profile-control-col">
                                    <Form.Control type="text" aria-labelledby="view-firstname" name="FirstName" onChange={handleInputChange} value={form.FirstName} readOnly={!edit}/>
                                </div>
                            </div>
                            <div className="profile-form-row row mt-3">
                                <div className="profile-label-col">
                                    <Form.Label id="view-lastname" className="profile-label-text">Last Name: </Form.Label>
                                </div>
                                <div className="profile-control-col">
                                    <Form.Control type="text" aria-labelledby="view-lastname" name="LastName" onChange={handleInputChange} value={form.LastName} readOnly={!edit}/>
                                </div>
                            </div>
                            <div className="profile-form-row row mt-3">
                                <div className="profile-label-col">
                                    <Form.Label id="view-restaurant" className="profile-label-text">Restaurant: </Form.Label>
                                </div>
                                <div className="profile-control-col">
                                    <Form.Control type="text" aria-labelledby="view-restaurant" name="Restaurant" onChange={handleInputChange} value={form.Restaurant} readOnly={!edit}/>
                                </div>
                            </div>
                            <div className="profile-form-row row mt-3">
                                <div className="profile-label-col">
                                    <Form.Label id="view-role" className="profile-label-text">Role: </Form.Label>
                                </div>
                                <div className="profile-control-col">
                                    <Form.Control type="text" aria-labelledby="view-role" name="Role" onChange={handleInputChange} value={form.Role} readOnly={!edit}/>
                                </div>
                            </div>
                            
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d={circleSlashForCancelPaths[0]}/>
                                    <path d={circleSlashForCancelPaths[1]}/>
                                </svg>
                            </Button>}
                        </React.Fragment>
                        : <p>Could not load profile. Please login and try again.</p>}
                </Form>
            </Card.Body>
        </Card>
    )
}

export default ViewProfile;
