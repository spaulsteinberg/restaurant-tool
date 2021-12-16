import React from 'react'
import LoadingSpinner from '../../../utility/LoadingSpinner'

const PermissionsLoading = ({loading}) => {
    return (
        <React.Fragment>
            { loading ? <LoadingSpinner alignment="centered" variant="primary" /> : null }
        </React.Fragment>
    )
}

export default PermissionsLoading
