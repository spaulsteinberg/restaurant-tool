import React, { useState } from 'react';
import { Paper, TableContainer, Table } from '@material-ui/core'
import InventoryTableBody from './InventoryTableBody';
import InventoryTableHeader from './InventoryTableHeader';
import SearchInventory from './SearchInventory';

const InventoryTable = ({inventory}) => {

    const [searchValue, setSearchValue] = useState('');
    const [tableItems, setTableItems] = useState([...inventory.names]);
    const handleSearchChange = event => {
        const { value } = event.target
        setSearchValue(value);
        const lv = value.toLowerCase();
        setTableItems(inventory.names.filter(item => item.toLowerCase().includes(lv)))
    }
    return (
        <div className="inventory-paper-container">
            <SearchInventory value={searchValue} handleSearchChange={handleSearchChange}/>
            <Paper>
                <TableContainer>
                    <Table>
                        <InventoryTableHeader />
                        <InventoryTableBody itemKeys={tableItems} />
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default InventoryTable
