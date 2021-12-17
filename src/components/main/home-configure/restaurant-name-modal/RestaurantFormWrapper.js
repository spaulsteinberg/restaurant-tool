import React, { useState } from 'react'
import RestNameContent from './RestNameContent'
import RestNameActions from './RestNameActions'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { editRestaurantName } from '../../../../api/homeApi'
import { editRestaurantNameAct } from '../../../../redux/home/homeActions'


const RestaurantFormWrapper = ({ data, handleClose }) => {

    const initialState = { ...data, font: data.font.replaceAll("_", " ") }
    const [submitState, setSubmitState] = useState({loading: false, error: null})
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={initialState}
            onSubmit={(values) => {
                const request = { ...values }
                request.font = request.font.replaceAll(" ", "_");
                console.log("submitted!", request)
                setSubmitState({ loading: true, error: null })
                editRestaurantName(request)
                    .then(res => {
                        console.log("success!")
                        setSubmitState({ loading: false, error: null })
                        dispatch(editRestaurantNameAct(request))
                        handleClose()
                    })
                    .catch(err => {
                        console.log(err)
                        setSubmitState({ loading: false, error: '*Submission failed. Please try again.' })
                    })
            }}
            validationSchema={Yup.object().shape({
                display: Yup.string().trim().required("Please enter a name.").max(20, "Cannot be more than 20 characters long."),
                color: Yup.string().trim().required("Please select a color."),
                font: Yup.string().required("Please select a font."),
                height: Yup.string().required("Please select a height."),
                weight: Yup.string().required("Please select a width."),
            })}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isValid
            }) => (
                <Form onSubmit={handleSubmit}>
                    <RestNameContent values={values} errors={errors} touched={touched} handleChange={handleChange} submitState={submitState} isValid={isValid} />
                    <RestNameActions loading={submitState.loading} isDisabled={submitState.loading} />
                </Form>
            )}
        </Formik>
    )
}

export default RestaurantFormWrapper
