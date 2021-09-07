import React from 'react'
import TableHeader from '../../utility/TableHeader'
import { TableHead, TableRow } from '@material-ui/core'

const InventoryTableHeader = ({active, click, columnNames}) => {
    return (
        <TableHead>
            <TableRow>
                <TableHeader columnNames={columnNames} active={active} click={click} style={{paddingLeft: "2rem", textAlign: "center"}}/>
            </TableRow>
        </TableHead>  
    )
}

export default InventoryTableHeader
