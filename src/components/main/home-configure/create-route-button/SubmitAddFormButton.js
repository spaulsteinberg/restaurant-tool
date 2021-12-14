import React from 'react'
import Button from 'react-bootstrap/Button'
import LoadingSpinner from '../../../utility/LoadingSpinner'

const SubmitAddFormButton = ({loading, error, handleRemoveButtonClick, hasManyLinks = false, showDeleteButton = false}) => {
    return (
        <div className='text-center submit-new-goto-container'>
            <div className='inner-container'>
            {
                loading ? <LoadingSpinner alignment="centered">Submitting...</LoadingSpinner>
                : 
                <React.Fragment>
                    <Button type="submit" variant="primary" className="btn-lg mx-1" disabled={loading || hasManyLinks}>Submit</Button>
                    {showDeleteButton && <Button variant="danger" className="btn-lg mx-1 linked-button" onClick={handleRemoveButtonClick}>Remove</Button>}
                </React.Fragment>
            }
            {error && <p className='text-danger'>{error}</p>}
            {hasManyLinks && <p className='text-danger'>You cannot add any more links. You already have the maximum of four.</p>}
            </div>
        </div>
    )
}

export default SubmitAddFormButton
