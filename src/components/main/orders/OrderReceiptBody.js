import React from 'react'
import { FOOD_KEY, PRICE_KEY, BEVERAGE_KEY } from '../../../constants/constants'
import OrderBodyList from './OrderBodyList'
import OrderReceiptFooter from './OrderReceiptFooter'
import OrderReceiptPayment from './OrderReceiptPayment'

const OrderReceiptBody = ({order, total, method}) => {
    return (
        <div className="receipt-body-container">
            <OrderBodyList list={order.drink} itemKey={BEVERAGE_KEY} priceKey={PRICE_KEY} />
            <OrderBodyList list={order.food} itemKey={FOOD_KEY} priceKey={PRICE_KEY} />
            <OrderReceiptFooter total={total.toFixed(2)} styles="receipt-body-row justify-content-end strong-border"/>
            <OrderReceiptPayment method={method} />
        </div>
    )
}

export default OrderReceiptBody;
