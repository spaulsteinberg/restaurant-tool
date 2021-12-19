import React from 'react'
import LoadingSpinner from '../../utility/LoadingSpinner'

const SignUpLoading = ({isLoading}) => isLoading ? <LoadingSpinner alignment="center">Loading...</LoadingSpinner> : null

export default SignUpLoading
