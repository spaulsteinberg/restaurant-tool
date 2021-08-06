import React from 'react'

const ItemDisplay = ({item, price, description}) => {
    return (
        <React.Fragment>
            <div className="item-col">{item}</div>
            <div>{description}</div>
            <div>{price}</div>
        </React.Fragment>
    )
}

export default ItemDisplay;
