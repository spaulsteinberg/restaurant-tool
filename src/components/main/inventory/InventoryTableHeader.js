import React from 'react'
import { TableColumnSortable } from '../../../models/main/tableColums';
import TableHeader from '../../utility/TableHeader'
import { TableHead, TableRow } from '@material-ui/core'

const InventoryTableHeader = () => {
    const columnNames = [
        new TableColumnSortable("Item", false),
        new TableColumnSortable("Items in Stock", false),
        new TableColumnSortable("Cost/Item", false),
        new TableColumnSortable("Actions", false),
    ]
    return (
        <TableHead>
            <TableRow>
                <TableHeader columnNames={columnNames} active={null} style={{paddingLeft: "2rem", textAlign: "center"}}/>
            </TableRow>
        </TableHead>  
    )
}

export default InventoryTableHeader
