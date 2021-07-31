import React from 'react'

const OrderRefreshButton = ({click}) => {
    return (
        <button className="btn btn-large btn-primary my-4" type="button" onClick={click}>Refresh Orders</button>
    )
}

export default OrderRefreshButton;
