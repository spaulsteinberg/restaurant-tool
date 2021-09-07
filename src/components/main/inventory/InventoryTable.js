import React, { useEffect, useState } from 'react';
import { Paper, TableContainer, Table, TablePagination } from '@material-ui/core'
import InventoryTableBody from './InventoryTableBody';
import InventoryTableHeader from './InventoryTableHeader';
import InventoryTableActionBar from './InventoryTableActionBar';

const InventoryTable = ({inventory}) => {

    
    const [searchValue, setSearchValue] = useState('');
    const [tableItems, setTableItems] = useState([...inventory.names]);

    // paginator values and states
    const rowPaginationOptions = [5, 10, 25];
    const [count, setCount] = useState(tableItems.length);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handlePageChange = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }
    
    const handleSearchChange = event => {
        const { value } = event.target
        setSearchValue(value);
        let filteredInventory = inventory.names.filter(item => item.toLowerCase().includes(value.toLowerCase()))
        setTableItems(filteredInventory)
        setCount(filteredInventory.length)
    }

    useEffect(() => {
        setTableItems([...inventory.names])
        setCount(inventory.names.length)
    }, [inventory.names])
    
    return (
        <div className="inventory-paper-container">
            <InventoryTableActionBar value={searchValue} handleSearchChange={handleSearchChange}/>
            <Paper>
                <TableContainer>
                    <Table>
                        <InventoryTableHeader />
                        <InventoryTableBody itemKeys={tableItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={rowPaginationOptions}
                    component="div"
                    count={count}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="pagination-table"
                />
            </Paper>
        </div>
    )
}

export default InventoryTable
