import React from 'react'
import LinkDisplayRow from './LinkDisplayRow'

const LinkDisplayList = ({links}) => {
    return (
        <React.Fragment>
            <ul>
                {
                    links.map(link => <LinkDisplayRow key={link.url} link={link} />)
                }
            </ul>
        </React.Fragment>
    )
}

export default LinkDisplayList
