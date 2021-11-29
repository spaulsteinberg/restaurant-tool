import React from 'react'
import Form from 'react-bootstrap/Form';

const ViewProfileReadOnlyDisplayEmail = ({email}) => {
    return (
        <div className="profile-form-row row">
            <div className="profile-label-col">
                <Form.Label id="view-email" className="profile-label-text">Email: </Form.Label>
            </div>
            <div className="profile-control-col">
                <Form.Control type="text" aria-labelledby="view-email" value={email} readOnly />
            </div>
        </div>
    )
}

export default ViewProfileReadOnlyDisplayEmail
