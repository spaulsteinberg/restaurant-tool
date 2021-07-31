import React from 'react'
import OrderBodyList from './OrderBodyList'

const OrderReceiptBody = ({order}) => {
    return (
        <div className="receipt-body-container">
            <OrderBodyList list={order.drink} itemKey={"item"} priceKey={"price"} />
            <OrderBodyList list={order.food} itemKey={"main"} priceKey={"price"} />
        </div>
    )
}

export default OrderReceiptBody;
