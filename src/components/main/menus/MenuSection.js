import React, { useState } from 'react'
import { SUB_MENU } from '../../../constants/constants';
import { addItemIcon } from '../../../constants/svg/svgs';
import AddItemButton from '../../utility/AddItemButton';
import MenuHeader from './MenuHeader'
import MenuItem from './MenuItem';
import NewItem from './NewItem';

const MenuSection = ({subMenu, sectionIndex, isCurrent, menuList, index, updateId}) => {

    const [sectionEdited, setSectionEdited] = useState(0);
    const [addItem, setAddItem] = useState(false);
    const handleSectionEdit = () => setSectionEdited(prev => prev + 1)
    const handleSectionExitEdit = () => setSectionEdited(prev => prev - 1)
    const handleAddItemClick = event => {
        event.preventDefault();
        setAddItem(true);
    }
    const handleDiscardAddClick = event => {
        event.preventDefault();
        setAddItem(false)
    }

    return (
        <div className="menu-section">
            <MenuHeader title={subMenu.menuName} sectionIndex={sectionIndex} subheader={subMenu.optionalMessage} updateKey={updateId} menuType={SUB_MENU} fontSize="3rem" fontWeight="400" menuList={menuList} index={index}/>
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
                    menus={menuList}
                    isCurrent={isCurrent}
                    menuIndex={index}
                    updateId={updateId}/>)}
            <div className="add-item-button-container mt-2">
                <AddItemButton icon={addItemIcon} variant="success" className="menu-new-button" onClick={handleAddItemClick}>Add Item</AddItemButton>
                {
                    addItem ? 
                    <NewItem 
                        onDiscard={handleDiscardAddClick}
                        sectionIndex={sectionIndex}
                        currentMenu={subMenu}
                        menuList={menuList}
                        updateId={updateId}
                        index={index}
                        isCurrent={isCurrent} />
                    : null
                }
            </div>
        </div>
    )
}

export default MenuSection;
