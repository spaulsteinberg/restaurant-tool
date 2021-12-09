import React from 'react'
import LinkDisplayHeader from './LinkDisplayHeader'
import LinkDisplayList from './LinkDisplayList'

const LinkDisplay = ({links, loading, handleSetEditable, handleRemoveLink}) => {
    return (
        <div className="my-2 home-links-input">
            <LinkDisplayHeader handleSetEditable={handleSetEditable} />
            <LinkDisplayList links={links} handleRemoveLink={handleRemoveLink} loading={loading} />
        </div>
    )
}

export default LinkDisplay
