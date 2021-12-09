import React from 'react'
import LinkDisplayRow from './LinkDisplayRow'

const LinkDisplayList = ({links, loading, handleRemoveLink}) => {
    return (
        <div className="mt-2">
            <ul>
                {
                    links.map((link, i) => <LinkDisplayRow key={link.url} link={link} loading={loading} indx={i} handleRemoveLink={handleRemoveLink} />)
                }
            </ul>
        </div>
    )
}

export default LinkDisplayList
