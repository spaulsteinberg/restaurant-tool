import React from 'react'

const OrderReceiptBody = ({order}) => {
    return (
        <div>
            <ul>
            {order.drink.map((item, i) => <li key={i}>{item.item}.........{item.price}</li>)}
            </ul>
        </div>
    )
}

export default OrderReceiptBody;
