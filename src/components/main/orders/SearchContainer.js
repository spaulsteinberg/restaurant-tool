import React from 'react';
import SearchBar from './SearchBar';

const SearchContainer = ({searchValue, change}) => {
    return (
        <div className="order-search-container">
            <SearchBar value={searchValue} change={change}/>
        </div>
    )
}

export default SearchContainer;

// have search bar here and have its state up here to update the list, put a button next to the search bar and select