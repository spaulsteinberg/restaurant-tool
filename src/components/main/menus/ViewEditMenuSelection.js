import React from 'react'
import MenuSelectionButton from './MenuSelectionButton'
import MenuSelectionItem from './MenuSelectionItem'

const ViewEditMenuSelection = ({handleViewClick}) => {
    return (
        <MenuSelectionItem className="menu-home-main-paper view-edit-menu-styles" onClick={handleViewClick}>
            <MenuSelectionButton handleClick={handleViewClick} buttonText="View or Edit Menus" />
        </MenuSelectionItem>
    )
}

export default ViewEditMenuSelection
