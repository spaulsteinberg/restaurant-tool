import React from 'react'
import DescriptionDisplayBody from './DescriptionDisplayBody'
import DescriptionDisplayHead from './DescriptionDisplayHead'

const DescriptionDisplay = ({ description, handleSetEditable }) => {
    return (
        <React.Fragment>
            <div className="home-description-display">
                <DescriptionDisplayHead handleSetEditable={handleSetEditable} />
                <DescriptionDisplayBody description={description} />
            </div>
        </React.Fragment>
    )
}

export default DescriptionDisplay
