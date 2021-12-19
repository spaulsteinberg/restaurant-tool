import React from 'react'
import SignupLink from './SignupLink'

const NewUserSignup = ({canSignUpUser}) =>  canSignUpUser ? <SignupLink /> : null

export default NewUserSignup
