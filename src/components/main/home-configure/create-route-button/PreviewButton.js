import React from 'react'
import { Form } from 'react-bootstrap'
import RouteButton from '../RouteButton'

const PreviewButton = ({values}) => {

    const configButton = {...values}
    configButton.margin = values.margin === "Small" ? 1 : values.margin === "Medium" ? 2 : values.margin === "Large" ? 3 : 4

    const handleDummyClick = (e, route) => {}
    
    return (
        <div className='text-center mt-2 mb-3'>
            <Form.Label>Button Preview:</Form.Label>
            <div>
                <RouteButton btn={configButton} sm={false} handleClick={handleDummyClick} />
            </div>
        </div>
    )
}

export default PreviewButton
