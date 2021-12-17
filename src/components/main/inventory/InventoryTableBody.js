import React from 'react'
import { TableRow, TableCell, TableBody } from '@material-ui/core'
import InventoryTableRowCells from './InventoryTableRowCells'
import { useSelector } from 'react-redux'


const InventoryTableBody = ({itemKeys, userHasWritePermissions}) => {
    const inventoryItems = useSelector(state => state.inventory.inventory.items);
    return (
        <TableBody>
            {itemKeys.map(item => <TableRow key={item}><InventoryTableRowCells item={inventoryItems[item]} userHasWritePermissions={userHasWritePermissions} /></TableRow> )}
            {itemKeys.length === 0 && <TableRow><TableCell colSpan={userHasWritePermissions ? 4 : 3} className="text-center">No inventory items to display.</TableCell></TableRow>}
        </TableBody>
    )
}

export default InventoryTableBody
