import React from 'react'

const OrderReceiptHeader = ({patron, date, number}) => {

    return (
        <div className="receipt-header-container">
            <p id="main-lookup">{number}</p>
            <p className="drop-headers">{patron}</p>
            <p className="drop-headers">{date}</p>
        </div>
    )
}

export default OrderReceiptHeader
