import React from 'react'
import DialogContent from '@material-ui/core/DialogContent'
import ChooseRouteAttrSelect from '../create-route-button/ChooseRouteAttrSelect'
import ChooseRouteAttrInput from '../create-route-button/ChooseRouteAttrInput'
import RestEditPreview from './RestEditPreview'
import RestNameFeedback from './RestNameFeedback'
const RestNameContent = ({ values, errors, touched, submitState, isValid, handleChange }) => {

    const colorOptions = ["primary", "secondary", "danger", "warning", "info", "light", "dark", "muted", "white"]
    const heightOptions = ["16px", "32px", "48px", "64px", "80px"]
    const fontOptions = ["Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "Courier New" , "Brush Script MT"]
    const fontWeightOptions = ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
    return (
        <DialogContent>
            <ChooseRouteAttrInput
                name="display"
                value={values.display}
                error={errors.display}
                touched={touched.display}
                isSubmitting={submitState.loading}
                handleChange={handleChange}
                labelText="Edit restaurant name:"
                />
            <ChooseRouteAttrSelect
                options={colorOptions}
                name="color"
                value={values.color}
                error={errors.color}
                touched={touched.color}
                isSubmitting={submitState.loading}
                handleChange={handleChange}
                labelText="Select a color:"
            />
            <ChooseRouteAttrSelect
                options={fontOptions}
                name="font"
                value={values.font}
                error={errors.font}
                touched={touched.font}
                isSubmitting={submitState.loading}
                handleChange={handleChange}
                labelText="Select a font:"
            />
            <ChooseRouteAttrSelect
                options={heightOptions}
                name="height"
                value={values.height}
                error={errors.height}
                touched={touched.height}
                isSubmitting={submitState.loading}
                handleChange={handleChange}
                labelText="Select a height:"
                subLabelText="*Note that this will shrink on smaller screen sizes"
            />
            <ChooseRouteAttrSelect
                options={fontWeightOptions}
                name="weight"
                value={values.weight}
                error={errors.weight}
                touched={touched.weight}
                isSubmitting={submitState.loading}
                handleChange={handleChange}
                labelText="Select a weight:"
            />
            { isValid && <RestEditPreview values={values} />}
            <RestNameFeedback loading={submitState.loading} error={submitState.error} />
        </DialogContent>
    )
}

export default RestNameContent
