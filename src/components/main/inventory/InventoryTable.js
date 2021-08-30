import React, { useState } from 'react';
import { Paper, TableContainer, Table } from '@material-ui/core'
import InventoryTableBody from './InventoryTableBody';
import InventoryTableHeader from './InventoryTableHeader';
import SearchInventory from './SearchInventory';

const InventoryTable = ({items}) => {

    const [searchValue, setSearchValue] = useState('');
    const [tableItems, setTableItems] = useState([...items]);
    const handleSearchChange = event => {
        const { value } = event.target
        setSearchValue(value);
        const lv = value.toLowerCase();
        setTableItems(items.filter(item => item.category.toLowerCase().includes(lv) || item.subCategory.toLowerCase().includes(lv) || item.consumable.toLowerCase().includes(lv)))
    }
    return (
        <div className="inventory-paper-container">
            <SearchInventory value={searchValue} handleSearchChange={handleSearchChange}/>
            <Paper>
                <TableContainer>
                    <Table>
                        <InventoryTableHeader />
                        <InventoryTableBody items={tableItems} />
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default InventoryTable
