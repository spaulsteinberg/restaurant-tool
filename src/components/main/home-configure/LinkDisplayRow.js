import React from 'react'
import { trashSmallIcon } from '../../../constants/svg/svgs'
import LoadingSpinner from '../../utility/LoadingSpinner'
import RemoveItemButton from '../../utility/RemoveItemButton'

const LinkDisplayRow = ({link, indx, loading, handleRemoveLink}) => {
    return (
        <li key={link.url} className="mb-2">
            <div className="display-action-container">
                <a href={link.url} target="_blank" rel="noreferrer">{link.display}</a>
                {
                    loading.isLoading && loading.position === indx 
                    ? <span className="mx-2"><LoadingSpinner alignment="centered" variant="danger" /></span>
                    : <RemoveItemButton icon={trashSmallIcon} className="btn-sm mx-2" onClick={() => handleRemoveLink(indx)} />
                }
            </div>
        </li>
    )
}

export default LinkDisplayRow
