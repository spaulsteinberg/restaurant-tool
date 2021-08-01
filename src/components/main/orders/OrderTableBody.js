import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';

const OrderTableBody = ({orders}) => {
    return (
        <TableBody>
            {orders.map(order =>
                <TableRow key={order.receiptNumber}>
                    <TableCell component="th" scope="row">{order.receiptNumber}</TableCell>
                    <TableCell>{order.firstName}</TableCell>
                    <TableCell>{order.lastName}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.shortDate}</TableCell>
                    <TableCell>${order.totalCost}</TableCell>
                    <TableCell>
                        <Link exact={`${true}`} to={{pathname: `/orders/order/${order.receiptNumber}`, state: {order: order}}}>
                            View Order
                        </Link>
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    )
}

export default OrderTableBody
