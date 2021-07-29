import { Paper } from '@material-ui/core';
import React from 'react'
import OrderReceiptBody from './OrderReceiptBody';
import OrderReceiptHeader from './OrderReceiptHeader';

const OrderReceiptBase = ({order}) => {
    return (
        <Paper className="order-receipt-body-container">
            <OrderReceiptHeader patron={`${order.firstName} ${order.lastName}`} date={order.date} number={order.receiptNumber}/>
            <OrderReceiptBody order={order.order} />
        </Paper>
    )
}

export default OrderReceiptBase;
