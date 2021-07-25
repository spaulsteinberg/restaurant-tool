import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
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

    const [innerOrderState, setInnerOrderState] = useState(orders.slice());
    const [sortedColumn, setSortedColumn] = useState('')
    const [activeColumn, setActiveColumn] = useState(null);

    const filterInput = useCallback(() => {
        setActiveColumn(null);
        if (!searchValue) setInnerOrderState(orders)
        else setInnerOrderState(tableFilter(orders, searchValue))
    }, [orders, searchValue])

    useEffect(() => {
        filterInput();
    }, [filterInput])

    const setActiveColumnsAndState = (index, comparator) => {
        setInnerOrderState([...innerOrderState].sort(comparator));
        setActiveColumn(index);
    }

    
    const handleColumnClick = e => {
        e.preventDefault();
        const {outerText, cellIndex} = e.target;
        // undo the filter if clicked again
        if (sortedColumn === outerText) {
            setInnerOrderState(tableFilter(orders, searchValue))
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
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader columnNames={columnNames} click={handleColumnClick} active={activeColumn}/>
                    </TableRow>
                </TableHead>
                <OrderTableBody orders={innerOrderState} />
            </Table>
            <Disclaimer text={" - Denotes a sortable column"} classes={"order-table-disclaimer"} iconComponent={<SortableIcon/>} />
        </TableContainer>
    )
}

export default OrderTable;
