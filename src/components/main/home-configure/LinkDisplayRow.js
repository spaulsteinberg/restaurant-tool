import React from 'react'

const LinkDisplayRow = ({link}) => {
    return (
        <li key={link.url}>
            <a href={link.url} target="_blank" rel="noreferrer">{link.display}</a>
        </li>
    )
}

export default LinkDisplayRow
