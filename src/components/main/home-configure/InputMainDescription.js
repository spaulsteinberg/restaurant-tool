import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editRestaurantDescription } from '../../../api'
import { editRestaurantDescriptionAct } from '../../../redux/home/homeActions'
import DescriptionDisplay from './DescriptionDisplay'
import DescriptionInput from './DescriptionInput'

const InputMainDescription = ({restDescription}) => {
    const [editable, setEditable] = useState(false)
    const [description, setDescription] = useState(restDescription)
    const [submitState, setSubmitState] = useState({loading: false, success: null, error: null})
    const dispatch = useDispatch()

    const handleInputChange = event => setDescription(event.target.value)

    const handleSetEditable = () => setEditable(prev => !prev)

    const handleOnSave = () => {
        setSubmitState({loading: true, success: null, error: null})
        editRestaurantDescription(description)
        .then(res => {
            dispatch(editRestaurantDescriptionAct(description))
            setSubmitState({loading: false, success: true, error: null})
            handleSetEditable();
        })
        .catch(err => {
            console.log(err)
            setSubmitState({loading: false, success: null, error: 'Save Failed. Please try again.'})
        })
    }

    const handleOnDiscard = () => {
        handleSetEditable();
    }

    return (
        <React.Fragment>
            {
                editable ? 
                    <DescriptionInput 
                        description={description} 
                        handleInputChange={handleInputChange}
                        handleOnSave={handleOnSave}
                        handleOnDiscard={handleOnDiscard}
                        submitState={submitState} /> 
                    : 
                        <DescriptionDisplay 
                            description={restDescription} 
                            handleSetEditable={handleSetEditable} />
            }
        </React.Fragment>
    )
}

export default InputMainDescription
