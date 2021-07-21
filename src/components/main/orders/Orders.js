import React, { useState } from 'react'
import SearchBar from './SearchBar';

const Orders = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchDuration, setSearchDuration] = useState('');

    const handleSearchChange = event => setSearchValue(event.target.value)
    const handleDurationChange = event => setSearchDuration(event.target.value);

    return (
        <div className="order-search-container">
            <SearchBar value={searchValue} searchChange={handleSearchChange} durationChange={handleDurationChange}/>
        </div>
    )
}

export default Orders;
