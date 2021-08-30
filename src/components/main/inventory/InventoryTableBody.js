import React from 'react'
import { TableRow, TableCell, TableBody } from '@material-ui/core'
import InventoryTableRowCells from './InventoryTableRowCells'


const InventoryTableBody = ({items}) => {
    return (
        <TableBody>
            {items.map(item => <TableRow key={item.id}><InventoryTableRowCells item={item} /></TableRow> )}
            {items.length === 0 && <TableRow><TableCell colSpan={4} className="text-center">No inventory items to display.</TableCell></TableRow>}
        </TableBody>
    )
}

export default InventoryTableBody
