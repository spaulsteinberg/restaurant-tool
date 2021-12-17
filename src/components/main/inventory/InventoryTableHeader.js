import React from 'react'
import TableHeader from '../../utility/TableHeader'
import { TableHead, TableRow } from '@material-ui/core'

const InventoryTableHeader = ({active, click, columnNames, userHasWritePermissions}) => {
    return (
        <TableHead>
            <TableRow>
                <TableHeader columnNames={columnNames} userHasWritePermissions={userHasWritePermissions} active={active} click={click} style={{paddingLeft: "2rem"}}/>
            </TableRow>
        </TableHead>  
    )
}

export default InventoryTableHeader
