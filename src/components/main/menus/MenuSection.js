import React from 'react'
import MenuHeader from './MenuHeader'

const MenuSection = ({subMenu}) => {
    return (
        <div className="menu-section">
            <MenuHeader title={subMenu.menuName} subheader={subMenu.optionalMessage} fontSize="3rem" fontWeight="400" />
            {subMenu.items.map(item => 
                <div key={item.item} className="menu-item-column">
                    <div className="item-col">{item.item}</div>
                    <div>{item.description}</div>
                    <div>${item.price}</div>
                </div>
            )}
        </div>
    )
}

export default MenuSection;
