import React from 'react'
import OrderBodyList from './OrderBodyList'
import OrderReceiptFooter from './OrderReceiptFooter'
import OrderReceiptPayment from './OrderReceiptPayment'

const OrderReceiptBody = ({order, total, method}) => {
    return (
        <div className="receipt-body-container">
            <OrderBodyList list={order.drink} itemKey={"item"} priceKey={"price"} />
            <OrderBodyList list={order.food} itemKey={"main"} priceKey={"price"} />
            <OrderReceiptFooter total={total} styles="receipt-body-row justify-content-end strong-border"/>
            <OrderReceiptPayment method={method} />
        </div>
    )
}

export default OrderReceiptBody;
