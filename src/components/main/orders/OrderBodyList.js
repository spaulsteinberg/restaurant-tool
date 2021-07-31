import React from 'react';
import PropTypes from 'prop-types';

const OrderBodyList = ({list, itemKey, priceKey}) => {
    return (
        <React.Fragment>
            {list.map((item, i) => 
                <div className="receipt-body-row" key={i}>
                    <div className="receipt-body-item">{item[itemKey]} ....</div>
                    <div className="receipt-body-price">{Number(item[priceKey]).toFixed(2)}</div>
                </div>
            )}
        </React.Fragment>
    )
}

OrderBodyList.propTypes = {
    list: PropTypes.array.isRequired,
    itemKey: PropTypes.string.isRequired,
    priceKey: PropTypes.string.isRequired,
}

export default OrderBodyList;
