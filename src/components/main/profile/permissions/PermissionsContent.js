import React from 'react'

const PermissionsContent = ({data}) => {
    return (
        <div>
            { data ? data.map(d => <p key={d.email}>{d.email}</p>) : null }
        </div>
    )
}

export default PermissionsContent
