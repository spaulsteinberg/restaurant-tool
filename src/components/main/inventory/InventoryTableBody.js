import React from 'react'
import { TableRow, TableCell, TableBody } from '@material-ui/core'

const InventoryTableBody = ({items}) => {
    return (
        <TableBody>
            {items.map(item => 
                <TableRow key={item.id}>
                    <TableCell component="th" scope="row" align="left" style={{paddingLeft: "2rem"}}>{item.consumable}</TableCell>
                    <TableCell align="center">{item.count}</TableCell>
                    <TableCell align="right">${item.cost.toFixed(2)}</TableCell>
                </TableRow>
            )}
            {items.length === 0 && <TableRow><TableCell colSpan={3} className="text-center">No inventory items to display.</TableCell></TableRow>}
        </TableBody>
    )
}

export default InventoryTableBody
