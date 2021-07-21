import React, { useState } from 'react'
import SearchContainer from './SearchContainer';

const Orders = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = event => {
        console.log(event);
        setSearchValue(event.target.value)
    }
    return (
        <SearchContainer searchValue={searchValue} change={handleSearchChange}/>
    )
}

export default Orders;
