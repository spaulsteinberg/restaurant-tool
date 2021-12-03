import React from 'react'
import { useHistory } from 'react-router-dom';
import MenuSelectionButton from './MenuSelectionButton'
import MenuSelectionItem from './MenuSelectionItem'

const ConfigureHomeSelection = () => {
    const history = useHistory()

    const handleClick = () => {
        history.push("/menus/configure/home")
    }
    return (
        <MenuSelectionItem className="menu-home-main-paper create-home-screen-styles">
            <MenuSelectionButton handleClick={handleClick} buttonText="Configure Home" />
        </MenuSelectionItem>
    )
}

export default ConfigureHomeSelection
