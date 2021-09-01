import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { searchIcon } from '../../../constants/svg/svgs';
import FormSelectBox from '../../utility/FormSelectBox';
import { ORDER_TIMEFRAMES } from '../../../constants/constants';
import InputBox from '../../utility/InputBox';
import useWideView from '../../../hooks/useWideView';

const SearchBar = ({value, searchChange, durationChange}) => {

    const {wideView} = useWideView(768);
    let options = [...Object.values(ORDER_TIMEFRAMES)].slice(1);
    const searchRef = React.useRef();

    return (
        <div id="search-bar-container">
            <InputGroup className="mb-4">
                    <InputGroup.Text>
                        {searchIcon}
                    </InputGroup.Text>
                    <InputBox ref={searchRef} placeholder="Filter by Receipt..." as="input" type="text" value={value} onChange={searchChange} />
                    { wideView && 
                        <InputGroup.Text className="bg-primary">
                            <FormSelectBox 
                                options={options} 
                                defaultText={ORDER_TIMEFRAMES.ONE_WEEK} 
                                defaultValue={ORDER_TIMEFRAMES.ONE_WEEK} 
                                changeFunction={durationChange} 
                                defaultDisabled={false} 
                            />
                        </InputGroup.Text>
                    }
            </InputGroup>
            { !wideView && 
                <div className="select-dropdown-mobile-tablet mb-4">
                    <FormSelectBox 
                        options={options}
                        defaultText={ORDER_TIMEFRAMES.ONE_WEEK} 
                        defaultValue={ORDER_TIMEFRAMES.ONE_WEEK} 
                        changeFunction={durationChange}
                        defaultDisabled={false} 
                    />
                </div>
            }
        </div>
    )
}

export default SearchBar;
