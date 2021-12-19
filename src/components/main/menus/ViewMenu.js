import React, { useState } from 'react'
import ControlledFormSelect from '../../utility/ControlledFormSelect';
import CurrentPaperMenu from './CurrentPaperMenu';


const ViewMenu = ({names, handleMenuChange, menu, menus, userCanEdit}) => {
    const options = ["Edit", "View"]
    const [allowEdit, setAllowEdit] = useState(true)
    const [selectedEditableValue, setSelectedEditableValue] = useState(options[0])
    const handleEditableChange = event => {
        if (event.target.value === "") return;
        setSelectedEditableValue(event.target.value)
        setAllowEdit(event.target.value === "Edit" ? true : false)
    }

    return (
        <div className="menu-dropdown-container">
            <div className="menu-select">
                <ControlledFormSelect options={names} method={2} value={menu ? menu.name : names[0].text} onChange={handleMenuChange} defaultDisabled />
                { userCanEdit ? <ControlledFormSelect options={options} value={selectedEditableValue} onChange={handleEditableChange} className="mt-3"/> : null}
            </div>
            <CurrentPaperMenu menu={menu} menus={menus} editable={userCanEdit && allowEdit}/>
        </div>
    )
}

export default ViewMenu;

