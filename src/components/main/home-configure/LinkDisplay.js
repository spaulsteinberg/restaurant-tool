import React from 'react'
import LinkDisplayHeader from './LinkDisplayHeader'
import LinkDisplayList from './LinkDisplayList'

const LinkDisplay = ({handleSetEditable, links}) => {
    return (
        <div className="my-2 home-links-input">
            <LinkDisplayHeader handleSetEditable={handleSetEditable} />
            <LinkDisplayList links={links} />
        </div>
    )
}

export default LinkDisplay
