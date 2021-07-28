import React from 'react'
import { useUserContext } from '../../../contexts/UserContext';

const OrderReceiptHeader = ({patron, date, number}) => {
    const { user } = useUserContext();

    return (
        <div>
            <h4>Patron : {patron} - {date} - {number} - {user.restaurant}</h4>
        </div>
    )
}

export default OrderReceiptHeader
