import React from 'react';
import PropTypes from 'prop-types';

const OrderReceiptPayment = ({method}) => {
    return (
        <div className="receipt-body-row">
            <div className="receipt-payment">
                <div className="justify-content-center">Payment Card</div>
                <div>{`XXXX-XXXX-XXXX-${method.slice(-4)}`}</div>
            </div>
        </div>
    )
}

OrderReceiptPayment.propTypes = {
    method: PropTypes.string.isRequired
}

export default OrderReceiptPayment;
