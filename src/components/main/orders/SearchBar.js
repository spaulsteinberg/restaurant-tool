import React, {useEffect, useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { searchIcon } from '../../../constants/svg/svgs';
import FormSelectBox from '../../utility/FormSelectBox';
import { ORDER_TIMEFRAMES } from '../../../constants/constants';

const SearchBar = ({value, searchChange, durationChange}) => {

    const [wideView, setWideView] = useState(false);
    let options = [...Object.values(ORDER_TIMEFRAMES)].slice(1)

    useEffect(() => {

        if (window.matchMedia("(min-width: 768px)").matches) {
            setWideView(true)
        }

        let widthCheck = window.matchMedia("(min-width: 768px)")
        widthCheck.addEventListener("change", shouldChangeInputAlignment, true);
        return () => {
            widthCheck.removeEventListener("change", shouldChangeInputAlignment, true)
          }
    }, [])

    const shouldChangeInputAlignment = e => e.matches ? setWideView(true) : setWideView(false)

    return (
        <div id="search-bar-container">
            <InputGroup className="mb-4">
                    <InputGroup.Text>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path d={searchIcon}/>
                        </svg>
                    </InputGroup.Text>
                    <FormControl placeholder="Filter by Receipt..." as="input" type="text" value={value} onChange={searchChange}/>
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
