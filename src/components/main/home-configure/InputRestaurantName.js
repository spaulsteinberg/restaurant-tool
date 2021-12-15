import React, { useState } from 'react'
import RestaurantNameDisplay from './RestaurantNameDisplay'
import RestaurantNameModal from './restaurant-name-modal/RestaurantNameModal'

const InputRestaurantName = ({restNameData}) => {
    const [editable, setEditable] = useState(false);

    const handleSetEditable = () => setEditable(prev => !prev)
    
    return (
        <div className="restaurant-name-input">
            {
                editable ? 
                    <RestaurantNameModal show={editable} handleClose={handleSetEditable} data={restNameData} />
                    : <RestaurantNameDisplay config={restNameData} handleSetEditable={handleSetEditable} />
            }
        </div>
    )
}

export default InputRestaurantName
