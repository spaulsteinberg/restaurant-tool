import React from 'react'
import Card from 'react-bootstrap/Card'

const AuthHeader = ({headerText}) => {
    return (
        <Card.Header>
            <h2 className="text-center mb-2">{headerText}</h2>
        </Card.Header>
    )
}

export default AuthHeader
