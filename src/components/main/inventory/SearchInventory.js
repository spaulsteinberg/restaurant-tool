import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import InputSearch from '../../utility/InputSearch';

const SearchInventory = ({value, handleSearchChange}) => {
    return (
        <Tooltip title="Search by item name, or filter by category in the dropdowns">
            <span>
                <InputSearch value={value} onChange={handleSearchChange} focus={1}/>
            </span>
        </Tooltip>
    )
}

export default SearchInventory;