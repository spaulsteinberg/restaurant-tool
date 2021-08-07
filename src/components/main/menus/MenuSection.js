import React, { useState } from 'react'
import MenuHeader from './MenuHeader'
import MenuItem from './MenuItem';

const MenuSection = ({subMenu, mainMenuName, sectionIndex, updateId}) => {

    const [sectionEdited, setSectionEdited] = useState(0);
    const handleSectionEdit = () => setSectionEdited(prev => prev + 1)
    const handleSectionExitEdit = () => setSectionEdited(prev => prev - 1)

    return (
        <div className="menu-section">
            <MenuHeader title={subMenu.menuName} subheader={subMenu.optionalMessage} fontSize="3rem" fontWeight="400" />
            {subMenu.items.map((item, i) => 
                <MenuItem 
                    key={`${item.item + i}`} 
                    item={item} 
                    itemIndex={i}
                    setSectionEdit={handleSectionEdit}
                    setSectionExit={handleSectionExitEdit}
                    sectionEdits={sectionEdited}
                    sectionIndex={sectionIndex}
                    mainMenuName={mainMenuName}
                    currentMenu={subMenu}
                    updateId={updateId}/>)}
        </div>
    )
}

export default MenuSection;
