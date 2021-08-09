import React from 'react'
import ControlledFormSelect from '../../utility/ControlledFormSelect';
import CurrentPaperMenu from './CurrentPaperMenu';


const ViewMenu = ({names, handleMenuChange, menu}) => {
    return (
        <div className="menu-dropdown-container">
            <div className="menu-select">
                <ControlledFormSelect options={names} method={2} value={menu ? menu.name : names[0].text} onChange={handleMenuChange} defaultDisabled />
            </div>
            <CurrentPaperMenu menu={menu} />
        </div>
    )
}

export default ViewMenu;

