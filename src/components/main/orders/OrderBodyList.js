import React from 'react';
import PropTypes from 'prop-types';
import { FOOD_KEY } from '../../../constants/constants';
import ReceiptRow from './ReceiptRow';

const OrderBodyList = ({list, itemKey, priceKey}) => {
    return (
        <React.Fragment>
            {list.map((item, i) => 
                <React.Fragment key={i}>
                    <ReceiptRow name={item[itemKey]} price={Number(item[priceKey]).toFixed(2)} />
                    {
                        itemKey === FOOD_KEY && item.additions && item.additions.length > 0 ? 
                        item.additions.map(addition => 
                            <ReceiptRow 
                                key={`${addition.item + i}`} 
                                name={addition.item} 
                                price={Number(addition.price).toFixed(2)}
                                isAddition
                        />)
                        : null
                    }
                    {
                        itemKey === FOOD_KEY && item.subtractions && item.subtractions.length > 0 ? 
                        item.subtractions.map(subtraction => 
                            <ReceiptRow 
                                key={`${subtraction.item + itemKey + i}`} 
                                name={subtraction}
                                isSubtraction
                        />)
                        : null
                    }
                </React.Fragment>
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
