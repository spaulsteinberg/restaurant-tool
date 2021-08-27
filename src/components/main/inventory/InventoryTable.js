import React from 'react';
import { Paper, TableContainer, Table } from '@material-ui/core'
import InventoryTableBody from './InventoryTableBody';
import InventoryTableHeader from './InventoryTableHeader';

const InventoryTable = ({items}) => {
    return (
        <Paper className="inventory-paper-container">
            <TableContainer>
                <Table>
                    <InventoryTableHeader />
                    <InventoryTableBody items={items} />
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default InventoryTable
