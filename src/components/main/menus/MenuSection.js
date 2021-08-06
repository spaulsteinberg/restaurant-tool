import React from 'react'
import MenuHeader from './MenuHeader'
import MenuItem from './MenuItem';

const MenuSection = ({subMenu, mainMenuName, sectionIndex, updateId}) => {
    return (
        <div className="menu-section">
            <MenuHeader title={subMenu.menuName} subheader={subMenu.optionalMessage} fontSize="3rem" fontWeight="400" />
            {subMenu.items.map((item, i) => 
                <MenuItem key={`${item.item + i}`} item={item} itemIndex={i}sectionIndex={sectionIndex} mainMenuName={mainMenuName} currentMenu={subMenu} updateId={updateId}/>)}
        </div>
    )
}

export default MenuSection;
