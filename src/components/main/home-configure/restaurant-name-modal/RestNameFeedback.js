import React from 'react'
import Disclaimer from '../../../utility/Disclaimer'
import LoadingSpinner from '../../../utility/LoadingSpinner'

const RestNameFeedback = ({loading, error}) => {
    return (
        <React.Fragment>
            {loading && <LoadingSpinner alignment="centered" variant="secondary" marginTop="1rem"></LoadingSpinner>}
            { error && <Disclaimer classes="text-danger text-center">{error}</Disclaimer>}
        </React.Fragment>
    )
}

export default RestNameFeedback
