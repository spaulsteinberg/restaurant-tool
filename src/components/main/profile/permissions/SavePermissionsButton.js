import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import LoadingSpinner from '../../../utility/LoadingSpinner'

const SavePermissionsButton = ({loading, success, error, touched, handleSave}) => {
    return (
        <div className="manage-permissions-save-container text-center">
            { 
                loading ? <LoadingSpinner alignment="centered" variant="success">Saving...</LoadingSpinner>
                : <Button variant="success" onClick={handleSave}>Submit</Button>
            }
            { !touched && (error || success) ? <Alert variant={error ? "danger" : "primary"} className="text-center mt-2">{error ? error : success}</Alert> : null }
        </div>
    )
}

export default SavePermissionsButton
