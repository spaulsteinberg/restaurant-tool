import React from 'react'
import { Form } from 'react-bootstrap'
import useWideView from '../../../../hooks/useWideView'
import Disclaimer from '../../../utility/Disclaimer'
import RestaurantNameDisplay from '../RestaurantNameDisplay'

const RestEditPreview = ({values}) => {
    const config = {...values}
    config.font = config.font.replaceAll(" ", "_")
    const wideScreen = useWideView(768).wideView
    return (
        <div>
            <Form.Label>Preview Title:</Form.Label>
            {!wideScreen ? <Disclaimer classes="text-info">*Text may render larger than appears.</Disclaimer> : null}
            <div className={values.color === "white" || values.color === "light" ? "bg-dark" : null}>
            <RestaurantNameDisplay config={config} handleSetEditable={() => {}} previewMode/>
            </div>
        </div>
    )
}

export default RestEditPreview
