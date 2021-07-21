import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { searchIcon } from '../../../constants/svg/svgs';

const SearchBar = ({value, change}) => {
    return (
        <div id="search-bar-container">
            <InputGroup className="mb-4">
                    <InputGroup.Text>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path d={searchIcon}/>
                        </svg>
                    </InputGroup.Text>
                    <FormControl placeholder="Filter by Receipt..." as="input" type="text" value={value} onChange={change}/>
            </InputGroup>
        </div>
    )
}

export default SearchBar;
