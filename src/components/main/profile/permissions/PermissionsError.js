import React from 'react'
import Alert from 'react-bootstrap/Alert'

const PermissionsError = ({error}) => {
    return (
        <React.Fragment>
            { error ? <Alert variant="danger" className="text-center">{error}</Alert> : null }
        </React.Fragment>
    )
}

export default PermissionsError
