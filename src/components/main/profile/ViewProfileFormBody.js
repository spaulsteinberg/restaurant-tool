import React from 'react'
import ViewProfileButtons from './ViewProfileButtons';
import LoadingSpinner from '../../utility/LoadingSpinner';
import Alert from 'react-bootstrap/Alert';

const ViewProfileFormBody = (props) => {
    return (
        <React.Fragment>
            {props.fetchingProfileDirectly ? 
                <LoadingSpinner alignment="centered" marginTop="1rem">Fetching Profile...</LoadingSpinner>
                : 
                    props.fetchProfileError ? 
                        <Alert variant="danger" className="mt-4">Could not fetch profile. Please reload and try again.</Alert>
                        : 
                        props.user && !props.profileError ? 
                        <React.Fragment>
                            {props.renderForm()}
                            <ViewProfileButtons
                                edit={props.edit}
                                loading={props.loading}
                                success={props.success}
                                error={props.error}
                                handleCancelClick={props.handleCancelClick}
                                handleEditClick={props.handleEditClick}
                            />
                        </React.Fragment>
                        : 
                            <Alert variant="danger" className="mt-4">Could not load profile. Please reload and try again.</Alert>
            }
        </React.Fragment>
    )
}

export default ViewProfileFormBody
