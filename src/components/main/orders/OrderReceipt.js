import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import LoadingSpinner from '../../utility/LoadingSpinner';
import Alert from 'react-bootstrap/Alert'
import OrderReceiptBase from './OrderReceiptBase';
import * as moment from 'moment';

const OrderReceipt = (props) => {

    const [orderView, setOrderView] = useState();
    const [orderViewLoading, setOrderViewLoading] = useState(false);
    const [orderViewError, setOrderViewError] = useState('');

    useEffect(() => {
        setOrderViewLoading(true);
        setOrderViewError(false);
        setOrderView(null);
        let id = props.match.params.id;
        db.collection(process.env.REACT_APP_ORDER_DB_COLLECTION)
        .doc(id)
        .get()
        .then(response => response.data())
        .then(response => {
            if (response) {
                response.receiptNumber = id;
                response.date = moment(response.date.toDate()).format('MM/DD/YYYY HH:mm');
                response.totalCost = parseFloat(response.totalCost);
                return setOrderView(response)
            }
            else {
                return setOrderViewError('This order could not be found.')
            }
        })
        .catch(err => {
            console.log(err)
            return setOrderViewError('An error occurred. Please try reloading the page.')
        })
        .finally(() => setOrderViewLoading(false))
    }, [props])
    return (
        <div className="mt-5">
            {orderViewLoading && 
                <LoadingSpinner alignment="centered" variant="primary">Loading Order</LoadingSpinner>
            }
            {orderView && <OrderReceiptBase order={orderView}/>}
            {orderViewError && 
                <div className="order-receipt-error-container">
                    <Alert variant="danger">{orderViewError}</Alert>
                </div>
            }
        </div>
    )
}

export default OrderReceipt;
