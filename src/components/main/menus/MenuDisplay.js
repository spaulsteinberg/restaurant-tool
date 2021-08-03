import React from 'react'
import MenuHeader from './MenuHeader'
import MenuSection from './MenuSection';

const MenuDisplay = ({menu}) => {
    return (
        <React.Fragment>
            <MenuHeader title={menu.name} subheader={menu.optionalMessage} fontSize="3.25rem" fontWeight="500" />
            <div className="separator"></div>
            { 
                !menu.menus || menu.menus.length === 0 ? 
                <div className="text-danger"><p>Create menus to see them here.</p></div>
                : menu.menus.map((menu, i) => <MenuSection key={i} subMenu={menu} />)
            }
        </React.Fragment>
    )
}

export default MenuDisplay;
