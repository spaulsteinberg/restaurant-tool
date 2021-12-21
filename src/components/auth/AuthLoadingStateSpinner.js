import React from 'react'
import LoadingSpinner from '../utility/LoadingSpinner'

const AuthLoadingStateSpinner = ({isLoading, loadText}) => isLoading ? <LoadingSpinner alignment="center">{loadText}</LoadingSpinner> : null

export default AuthLoadingStateSpinner;
