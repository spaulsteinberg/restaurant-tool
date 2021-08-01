import React from 'react';
import PropTypes from 'prop-types';

const ReceiptRow = ({name, price, isAddition = false, isSubtraction = false}) => {
    return (
        <div className="receipt-body-row">
            <div className="receipt-body-item">
                {
                    isAddition ? <span>&nbsp;+ </span> 
                    : isSubtraction ? <span>&nbsp;- </span> 
                    : null
                }
                {name} {price && "...."}
                </div>
            <div className="receipt-body-price">{price}</div>
        </div>
    )
}

ReceiptRow.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isAddition: PropTypes.bool,
    isSubtraction: PropTypes.bool
}

export default ReceiptRow;
