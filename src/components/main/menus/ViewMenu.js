import React from 'react'
import FormSelectBox from '../../utility/FormSelectBox';
import CurrentPaperMenu from './CurrentPaperMenu';


const ViewMenu = ({names, menuChange, menu, defaultText}) => {
    return (
        <div className="menu-dropdown-container">
            <div className="menu-select">
                <FormSelectBox options={names} defaultText={defaultText} defaultValue={defaultText} changeFunction={menuChange}  method={2} defaultDisabled />
            </div>
            <CurrentPaperMenu menu={menu} />
        </div>
    )
}

export default ViewMenu;

