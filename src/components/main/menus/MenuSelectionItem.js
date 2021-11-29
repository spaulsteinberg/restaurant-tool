import React from 'react'
import { Paper } from '@material-ui/core'

const MenuSelectionItem = ({children, ...props}) => {
    return (
        <Paper {...props}>
            {children}
        </Paper>
    )
}

export default MenuSelectionItem
