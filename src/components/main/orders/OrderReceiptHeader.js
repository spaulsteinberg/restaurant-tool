import React from 'react'

const OrderReceiptHeader = ({patron, date, number}) => {
    return (
        <div>
            <h4>Patron : {patron} - {date} - {number}</h4>
        </div>
    )
}

export default OrderReceiptHeader
