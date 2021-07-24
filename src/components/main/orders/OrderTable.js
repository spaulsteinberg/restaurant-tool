import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { firstNameComparator, lastNameComparator, dateComparator, costComparator } from '../../../utils';
import OrderTableBody from './OrderTableBody';
import TableHeader from '../../utility/TableHeader';

const tableFilter = (orders, toSearch) => [...orders].filter(order => order.receiptNumber.toLowerCase().includes(toSearch.toLowerCase()))

const OrderTable = ({orders, searchValue}) => {
    let columnNames = ["Receipt #", "First", "Last", "Email", "Date", "Amount", "View"];

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
        const {innerText, cellIndex} = e.target;
        if (sortedColumn === innerText) {
            setInnerOrderState(tableFilter(orders, searchValue))
            setActiveColumn(null)
            setSortedColumn('')
            return;
        }
        setSortedColumn(innerText);
        switch(innerText){
            case "First":
                setActiveColumnsAndState(cellIndex, firstNameComparator);
                break;
            case "Last":
                setActiveColumnsAndState(cellIndex, lastNameComparator);
                break;
            case "Date":
                setActiveColumnsAndState(cellIndex, dateComparator);
                break;
            case "Amount":
                setActiveColumnsAndState(cellIndex, costComparator);
                break;
            default:
                return;
        }
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
        </TableContainer>
    )
}

export default OrderTable;
