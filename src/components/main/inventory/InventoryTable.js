import React, { useState } from 'react';
import { Paper, TableContainer, Table } from '@material-ui/core'
import InventoryTableBody from './InventoryTableBody';
import InventoryTableHeader from './InventoryTableHeader';
import SearchInventory from './SearchInventory';

const InventoryTable = ({items}) => {

    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = event => setSearchValue(event.target.value);
    return (
        <div className="inventory-paper-container">
            <SearchInventory value={searchValue} handleSearchChange={handleSearchChange}/>
            <Paper>
                <TableContainer>
                    <Table>
                        <InventoryTableHeader />
                        <InventoryTableBody items={items} />
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default InventoryTable
