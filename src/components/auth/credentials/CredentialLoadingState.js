import React from 'react'
import LoadingSpinner from '../../utility/LoadingSpinner'

const CredentialLoadingState = ({isLoading}) => isLoading ? <LoadingSpinner alignment="center">Updating...</LoadingSpinner> : null

export default CredentialLoadingState
