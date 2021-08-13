import React, { useState } from 'react'
import { SUB_MENU } from '../../../constants/constants';
import { addItemIcon } from '../../../constants/svg/svgs';
import AddItemButton from '../../utility/AddItemButton';
import MenuHeader from './MenuHeader'
import MenuItem from './MenuItem';

const MenuSection = ({subMenu, sectionIndex, updateId}) => {

    const [sectionEdited, setSectionEdited] = useState(0);
    const handleSectionEdit = () => setSectionEdited(prev => prev + 1)
    const handleSectionExitEdit = () => setSectionEdited(prev => prev - 1)

    return (
        <div className="menu-section">
            <MenuHeader title={subMenu.menuName} sectionIndex={sectionIndex} subheader={subMenu.optionalMessage} updateKey={updateId} menuType={SUB_MENU} fontSize="3rem" fontWeight="400" />
            {subMenu.items.map((item, i) => 
                <MenuItem 
                    key={`${item.item + i}`} 
                    item={item} 
                    itemIndex={i}
                    setSectionEdit={handleSectionEdit}
                    setSectionExit={handleSectionExitEdit}
                    sectionEdits={sectionEdited}
                    sectionIndex={sectionIndex}
                    currentMenu={subMenu}
                    updateId={updateId}/>)}
            <div className="add-item-button-container mt-2">
                <AddItemButton icon={addItemIcon} variant="success">Add Item</AddItemButton>
            </div>
        </div>
    )
}

export default MenuSection;
