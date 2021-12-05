import React, { useState } from 'react'
import { editRestaurantName } from '../../../api'
import RestaurantNameInput from './RestaurantNameInput'
import RestaurantNameDisplay from './RestaurantNameDisplay'

const InputRestaurantName = ({restName}) => {
    const [restaurantName, setRestaurantName] = useState(restName)
    const [editable, setEditable] = useState(false);
    const [submitState, setSubmitState] = useState({loading: false, success: null, error: null})
    const [lastSavedName, setLastSavedName] = useState('')

    const handleInputChange = event => setRestaurantName(event.target.value)

    const handleSave = event => {
        event.preventDefault();
        setSubmitState({loading: true, success: null, error: null})
        editRestaurantName(restaurantName)
        .then(res => {
            setSubmitState({loading: false, success: true, error: null})
            setLastSavedName(restaurantName)
            setEditable(false)
        })
        .catch(err => {
            console.log(err)
            setSubmitState({loading: false, success: null, error: '*Save failed. Please try again.'})
        })
    }

    const handleDiscard = event => {
        setRestaurantName(lastSavedName ? lastSavedName : restName)
        handleSetEditable()
    }

    const handleSetEditable = () => setEditable(prev => !prev)
    
    return (
        <div id="restaurant-name-input">
            {
                editable ? 
                    <RestaurantNameInput 
                        restaurantName={restaurantName} 
                        handleInputChange={handleInputChange} 
                        handleSave={handleSave}
                        handleDiscard={handleDiscard} 
                        submitState={submitState}/>
                    : <RestaurantNameDisplay restaurantName={restaurantName} handleSetEditable={handleSetEditable} />
            }
        </div>
    )
}

export default InputRestaurantName
