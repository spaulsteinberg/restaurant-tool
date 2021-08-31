import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import InputSearch from '../../utility/InputSearch';

const SearchInventory = ({value, handleSearchChange}) => {
    return (
        <div className="search-inventory-input-container">
             <div className="search-inventory-input">
                 <Tooltip title="Search by item name, or filter by category in the dropdowns">
                    <span>
                        <InputSearch value={value} onChange={handleSearchChange} focus={1}/>
                    </span>
                 </Tooltip>
             </div>
        </div>
    )
}

export default SearchInventory;