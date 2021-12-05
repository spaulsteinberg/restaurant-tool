import React from 'react'
import EditIconButton from '../../utility/EditIconButton'

const RestaurantNameDisplay = ({ restaurantName, handleSetEditable }) => {
    return (
        <React.Fragment>
            <div className="input-container">
                <h1>{restaurantName}</h1>
            </div>
            <EditIconButton className="button-styles" text="" onClick={handleSetEditable} />
        </React.Fragment>
    )
}

export default RestaurantNameDisplay
