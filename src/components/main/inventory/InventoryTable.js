import React, { useEffect, useState } from 'react';
import { Paper, TableContainer, Table, TablePagination } from '@material-ui/core'
import InventoryTableBody from './InventoryTableBody';
import InventoryTableHeader from './InventoryTableHeader';
import InventoryTableActionBar from './InventoryTableActionBar';
import Disclaimer from '../../utility/Disclaimer';
import SortableIcon from '../../utility/SortableIcon';
import { TableColumnSortable } from '../../../models/main/tableColums';
import { INVENTORY_COLS, defaultDropDownText } from '../../../constants/constants';

const InventoryTable = ({inventory}) => {

    
    const [searchValue, setSearchValue] = useState('');
    const [categoryValue, setCategoryFilterValue] = useState(defaultDropDownText);
    const [availableCategories, setAvailableCategories] = useState(Object.keys(inventory.categories))
    const [tableItems, setTableItems] = useState([...inventory.names]);

    const columnNames = [
        new TableColumnSortable(INVENTORY_COLS.ITEM, true),
        new TableColumnSortable(INVENTORY_COLS.STOCK, true),
        new TableColumnSortable(INVENTORY_COLS.COST, true),
        new TableColumnSortable(INVENTORY_COLS.ACTIONS, false),
    ]

    // sorting values and states
    const [activeColumn, setActiveColumn] = useState({index: null, text: ''});
    const activateColumn = event => {
        const {outerText, cellIndex} = event.target;
        if (outerText === activeColumn.text){
            setTableItems([...inventory.names])
            setActiveColumn({index: null, text: ''});
            setCount(inventory.names.length)
        }
        else if (outerText === INVENTORY_COLS.ITEM){
            setTableItems([...tableItems].sort())
            setActiveColumn({index: cellIndex, text: outerText});
        } else if (outerText === INVENTORY_COLS.COST){
            let filtered = [...tableItems].sort((a, b) => inventory.items[a].cost - inventory.items[b].cost)
            setTableItems(filtered)
            setActiveColumn({index: cellIndex, text: outerText});
            setCount(filtered.length)
        } else if (outerText === INVENTORY_COLS.STOCK){
            let filtered = [...tableItems].sort((a, b) => inventory.items[a].count - inventory.items[b].count)
            setTableItems(filtered)
            setActiveColumn({index: cellIndex, text: outerText});
            setCount(filtered.length)
        }
        
    }

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
        setActiveColumn({index: null, text: ''});
        setCategoryFilterValue(defaultDropDownText)
        setPage(0)
    }

    const handleFilterChange = event => {
        const { value } = event.target
        setCategoryFilterValue(value);
        if (value !== defaultDropDownText){
            setSearchValue('')
            let temp = []
            for (const name of inventory.names){
                if (inventory.items[name].category === value){
                    temp.push(name)
                }
            }
            setTableItems(temp)
            setCount(temp.length)
            setPage(0)
        } else {
            setTableItems([...inventory.names])
            setCount(inventory.names.length)
            setPage(0)
        }
        // on filter change filter on category filter after setting new category filter
    }

    useEffect(() => {
        setTableItems([...inventory.names])
        setAvailableCategories(Object.keys(inventory.categories))
        setCategoryFilterValue(defaultDropDownText)
        setCount(inventory.names.length)
    }, [inventory.names, inventory.categories])
    
    return (
        <div className="inventory-paper-container">
            <InventoryTableActionBar 
                value={searchValue} 
                handleSearchChange={handleSearchChange} 
                handleFilterChange={handleFilterChange}
                categoryList={availableCategories}
                categoryValue={categoryValue}
                />
            <Paper>
                <TableContainer>
                    <Table>
                        <InventoryTableHeader active={activeColumn.index} click={activateColumn} columnNames={columnNames}/>
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
                <Disclaimer classes={"order-table-disclaimer"} iconComponent={<SortableIcon />}> - Denotes a sortable column</Disclaimer>
            </Paper>
        </div>
    )
}

export default InventoryTable
