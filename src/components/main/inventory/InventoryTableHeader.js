import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableHeaderCell from '../../utility/TableHeaderCell'

const InventoryTableHeader = ({active, click, columnNames, userHasWritePermissions}) => {
    return (
        <TableHead>
            <TableRow>
                <TableHeaderCell name={columnNames[0].name} isSortable={columnNames[0].sortable} indx={0} isActive={active} align="text-left" handleClick={click} addLeftPadding/>
                <TableHeaderCell name={columnNames[1].name} isSortable={columnNames[1].sortable} indx={1} isActive={active} align={userHasWritePermissions ? "text-center" : "text-end"} handleClick={click} addLeftPadding/>
                <TableHeaderCell name={columnNames[2].name} isSortable={columnNames[2].sortable} indx={2} isActive={active} align="text-end" handleClick={click} addLeftPadding/>
                { userHasWritePermissions && <TableHeaderCell name={columnNames[3].name} isSortable={columnNames[3].sortable} indx={3} isActive={active} align="text-center" handleClick={click} />}
            </TableRow>
        </TableHead>  
    )
}
export default InventoryTableHeader
