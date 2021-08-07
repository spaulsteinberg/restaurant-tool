import { Paper } from '@material-ui/core'
import React from 'react'
import MenuDisplay from './MenuDisplay';

const CurrentPaperMenu = ({menu}) => {
    return (
        // TO_DO - handle no menus yet
        <Paper className="menu-focused" style={{alignItems: menu ? 'stretch' : 'center', alignContent: menu ? 'flex-start' : 'stretch'}}>
            {
                !menu ? <div className="blank-menu"> Choose a Menu to View to get started! </div>
                : <MenuDisplay menu={menu} />
            }
        </Paper>
    )
}

export default CurrentPaperMenu;