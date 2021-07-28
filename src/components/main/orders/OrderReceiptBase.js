import { Paper } from '@material-ui/core';
import React from 'react'
import OrderReceiptHeader from './OrderReceiptHeader';

const OrderReceiptBase = ({order}) => {
    return (
        <Paper className="order-receipt-body-container">
            <OrderReceiptHeader patron={`${order.firstName} ${order.lastName}`}date={order.date} number={order.receiptNumber}/>
        </Paper>
    )
}

export default OrderReceiptBase;
