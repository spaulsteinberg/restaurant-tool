import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { firstNameComparator, lastNameComparator, dateComparator, costComparator } from '../../../utils';
import OrderTableBody from './OrderTableBody';
import TableHeader from '../../utility/TableHeader';
import { TableColumnSortable } from '../../../models/main/tableColums';
import SortableIcon from '../../utility/SortableIcon';
import Disclaimer from '../../utility/Disclaimer';

const tableFilter = (orders, toSearch) => [...orders].filter(order => order.receiptNumber.toLowerCase().includes(toSearch.toLowerCase()))

const OrderTable = ({orders, searchValue}) => {
    let columnNames = [
        new TableColumnSortable("Receipt #", false),
        new TableColumnSortable("First", true),
        new TableColumnSortable("Last", true),
        new TableColumnSortable("Email", false),
        new TableColumnSortable("Date", true),
        new TableColumnSortable("Amount", true),
        new TableColumnSortable("View", false)
    ];

    const rowPaginationOptions = [5, 10, 25]

    const [innerOrderState, setInnerOrderState] = useState(orders.slice());
    const [sortedColumn, setSortedColumn] = useState('')
    const [activeColumn, setActiveColumn] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);

    const filterInput = useCallback(() => {
        setPage(0);
        setActiveColumn(null);
        if (!searchValue) {
            setInnerOrderState(orders);
            setCount(orders.length)
        }
        else {
            let filteredArray = tableFilter(orders, searchValue)
            setInnerOrderState(filteredArray);
            setCount(filteredArray.length)
        }
    }, [orders, searchValue])

    useEffect(() => {
        filterInput();
    }, [filterInput])

    const setActiveColumnsAndState = (index, comparator) => {
        setInnerOrderState([...innerOrderState].sort(comparator));
        setActiveColumn(index);
    }

    const handlePageChange = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }
    
    const handleColumnClick = e => {
        e.preventDefault();
        const {outerText, cellIndex} = e.target;
        // undo the filter if clicked again
        if (sortedColumn === outerText) {
            let filteredArray = tableFilter(orders, searchValue)
            setInnerOrderState(filteredArray)
            setCount(filteredArray.length)
            setActiveColumn(null)
            setSortedColumn('')
            return;
        }
        setSortedColumn(outerText);

        return outerText === "First" ? setActiveColumnsAndState(cellIndex, firstNameComparator) : outerText === "Last" ? setActiveColumnsAndState(cellIndex, lastNameComparator)
        : outerText === "Date" ? setActiveColumnsAndState(cellIndex, dateComparator) : outerText === "Amount" ? setActiveColumnsAndState(cellIndex, costComparator)
        : null
    }
    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader columnNames={columnNames} click={handleColumnClick} active={activeColumn} />
                        </TableRow>
                    </TableHead>
                    <OrderTableBody orders={innerOrderState.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowPaginationOptions}
                component="div"
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Disclaimer classes={"order-table-disclaimer"} iconComponent={<SortableIcon />}> - Denotes a sortable column</Disclaimer>
        </Paper>
    )
}

export default OrderTable;
