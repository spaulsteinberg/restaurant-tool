import React from 'react';
import PropTypes from 'prop-types';

const ReceiptRow = ({name, price, quantity, isAddition = false, isSubtraction = false}) => {
    return (
        <div className="receipt-body-row">
            <div className="receipt-body-item">
                {
                    isAddition ? <span>&nbsp;+ </span> 
                    : isSubtraction ? <span>&nbsp;- </span> 
                    : null
                }
                {name}{quantity && quantity > 1 ? ` (${quantity})` : null} {price && "...."}
                </div>
            { !isSubtraction && <div className="receipt-body-price">{(price * (quantity ? quantity : 1)).toFixed(2)}</div>}
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
