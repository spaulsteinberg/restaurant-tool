import { Paper } from '@material-ui/core'
import React from 'react'
import MenuDisplay from './MenuDisplay';

const CurrentPaperMenu = ({menu, menus, editable}) => {
    return (
        <Paper className="menu-focused" style={{alignItems: menu ? 'stretch' : 'center', alignContent: menu ? 'flex-start' : 'stretch'}}>
            {
                !menu ? <div className="blank-menu"> Choose a Menu to View to get started! </div>
                : <MenuDisplay menu={menu} menus={menus} editable={editable}/>
            }
        </Paper>
    )
}

export default CurrentPaperMenu;