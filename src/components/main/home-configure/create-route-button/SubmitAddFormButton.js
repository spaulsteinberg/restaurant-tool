import React from 'react'
import Button from 'react-bootstrap/Button'
import LoadingSpinner from '../../../utility/LoadingSpinner'

const SubmitAddFormButton = ({loading, error, hasManyLinks}) => {
    return (
        <div className='text-center submit-new-goto-container'>
            <div className='inner-container'>
            {
                loading ? <LoadingSpinner alignment="centered">Submitting...</LoadingSpinner>
                : <Button type="submit" variant="primary" className="btn-lg btn-block" disabled={loading || hasManyLinks}>Submit</Button>
            }
            {error && <p className='text-danger'>{error}</p>}
            {hasManyLinks && <p className='text-danger'>You cannot add any more links. You already have the maximum of four.</p>}
            </div>
        </div>
    )
}

export default SubmitAddFormButton
