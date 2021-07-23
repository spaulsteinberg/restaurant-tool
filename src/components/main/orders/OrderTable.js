import React, { useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { firstNameComparator, lastNameComparator, dateComparator, costComparator } from '../../../utils';
import OrderTableBody from './OrderTableBody';



const OrderTable = ({orders}) => {
    let columnNames = ["Receipt #", "First", "Last", "Email", "Date", "Amount", "View"];

    const [innerOrderState, setInnerOrderState] = useState(orders.slice());

    
    const handleColumnClick = e => {
        e.preventDefault();
        switch(e.target.innerText){
            case "First":
                setInnerOrderState([...innerOrderState].sort(firstNameComparator));
                break;
            case "Last":
                setInnerOrderState([...innerOrderState].sort(lastNameComparator));
                break;
            case "Date":
                setInnerOrderState([...innerOrderState].sort(dateComparator))
                break;
            case "Amount":
                setInnerOrderState([...innerOrderState].sort(costComparator))
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
                    {columnNames.map(name => <TableCell key={name} className="table-header" onClick={handleColumnClick}>{name}</TableCell>)}
                </TableRow>
            </TableHead>
            <OrderTableBody orders={innerOrderState} />
      </Table>
        </TableContainer>
    )
}

export default OrderTable;
