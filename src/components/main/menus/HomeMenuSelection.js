import React from 'react'
import MenuSelectionButton from './MenuSelectionButton'
import MenuSelectionItem from './MenuSelectionItem'

const HomeMenuSelection = () => {

    const handleClick = () => {
        console.log("hey")
    }
    return (
        <MenuSelectionItem className="menu-home-main-paper create-home-screen-styles">
            <MenuSelectionButton handleClick={handleClick} buttonText="Configure Home" />
        </MenuSelectionItem>
    )
}

export default HomeMenuSelection
