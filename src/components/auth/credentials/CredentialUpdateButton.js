import React from 'react'
import Button from 'react-bootstrap/Button'

const CredentialUpdateButton = ({handleSubmit}) => {
    return (
        <div className="text-center">
            <Button type="submit" className="w-100 my-3" variant="warning" onClick={handleSubmit}>Update</Button>
        </div>
    )
}

export default CredentialUpdateButton
