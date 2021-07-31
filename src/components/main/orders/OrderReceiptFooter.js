import React from 'react'
import PropTypes from 'prop-types';

const OrderReceiptFooter = ({styles, total}) => {
    return (
        <React.Fragment>
            <div className={`${styles} mt-4`}>
                ${total}
            </div>
        </React.Fragment>
    )
}

OrderReceiptFooter.propTypes = {
    styles: PropTypes.string,
    total: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

OrderReceiptFooter.defaultProps = {
    styles: "receipt-body-row"
}

export default OrderReceiptFooter
