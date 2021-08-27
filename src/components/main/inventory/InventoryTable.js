import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow } from '@material-ui/core'
import { TableColumnSortable } from '../../../models/main/tableColums'
import TableHeader from '../../utility/TableHeader'

const InventoryTable = () => {
    return (
        <Paper className="mt-4">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader columnNames={[new TableColumnSortable("1", false), new TableColumnSortable("2", false)]} active={1}/>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default InventoryTable
