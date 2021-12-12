import React, { useState, useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'
import ChooseRouteAttrSelect from './ChooseRouteAttrSelect'
import ChooseRouteAttrInput from './ChooseRouteAttrInput'
import PreviewButton from './PreviewButton'
import SubmitAddFormButton from './SubmitAddFormButton'
import { addGotoLink } from '../../../../api'
import { useDispatch } from 'react-redux'
import { addGotoLinkAct } from '../../../../redux/home/homeActions'

const AddRouteForm = ({handleOnClose, modalContentProps}) => {

    const formRef = useRef()
    const dispatch = useDispatch()
    const [requestState, setRequestState] = useState({loading: false, error: null})

    
    const initialState = {
        route: '', //input field
        text: '', //select field
        background: 'transparent', // select field
        border: '', //select field
        display: '', // input field
        hoverBackground: 'none', //select field
        margin: '', //select field
    }

    const marginOptions = ["Small", "Medium", "Large", "X-Large"]

    const colorOptions = ["primary", "secondary", "danger", "warning", "info", "light", "dark", "muted", "white"]

    const backgroundOptions = [...colorOptions, "transparent"]

    const hoverOptions = ["none", ...colorOptions]

    return (
        <Formik
            innerRef={formRef}
            initialValues={initialState}
            onSubmit={(values) => {
                if (modalContentProps.includes(values.display)) return setRequestState({loading: false, error: `Yout already have a link named ${values.display}!`})
                setRequestState({loading: true, error: null})
                const request = {...values}
                request.margin = values.margin === marginOptions[0] ? 1 : values.margin === marginOptions[1] ? 2 : values.margin === marginOptions[2] ? 3 : 4
                addGotoLink(request)
                .then(res => {
                    console.log("success!")
                    dispatch(addGotoLinkAct(request))
                    setRequestState({loading: false, error: null})
                    handleOnClose();
                })
                .catch(err => {
                    console.log(err)
                    setRequestState({loading: false, error: 'An error occurred! Please try again.'})
                })
            }}
            validationSchema={Yup.object().shape({
                route: Yup.string().trim().required("Please enter a valid relative route."),
                display: Yup.string().required("Please enter a display name.")
                    .min(2, "Must be at least two characters long.")
                    .max(15, "Cannot be more than 15 characters long."),
                text: Yup.string().trim().required("Please a text color for your button."),
                background: Yup.string().required("Please select a valid background color."),
                border: Yup.string().required("Please select a valid border."),
                hoverBackground: Yup.string().required("Please make a valid hover selection."),
                margin: Yup.string().required("Please choose a valid spacing.")
            })}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <ChooseRouteAttrInput
                        autoFocus={true}
                        name="route"
                        value={values.route}
                        error={errors.route}
                        touched={touched.route}
                        isSubmitting={requestState.loading}
                        handleChange={handleChange}
                        labelText="<span>Enter a <i>relative</i> route:</span>"
                        subLabelText="<span>Click <a href='https://www.w3schools.com/html/html_filepaths.asp' target='_blank'>here</a> for more info on relative links</span>"
                    />
                    <ChooseRouteAttrInput
                        name="display"
                        value={values.display}
                        error={errors.display}
                        touched={touched.display}
                        isSubmitting={requestState.loading}
                        handleChange={handleChange}
                        labelText="Enter some display text:"
                    />
                    <ChooseRouteAttrSelect
                        options={colorOptions}
                        name="text"
                        value={values.text}
                        error={errors.text}
                        touched={touched.text}
                        isSubmitting={requestState.loading}
                        handleChange={handleChange}
                        labelText="Select a text color:"
                    />
                    <ChooseRouteAttrSelect
                        options={backgroundOptions}
                        name="background"
                        value={values.background}
                        error={errors.background}
                        touched={touched.background}
                        isSubmitting={requestState.loading}
                        handleChange={handleChange}
                        labelText="Select a background color: "
                    />
                    <ChooseRouteAttrSelect
                        options={colorOptions}
                        name="border"
                        value={values.border}
                        error={errors.border}
                        touched={touched.border}
                        isSubmitting={requestState.loading}
                        handleChange={handleChange}
                        labelText="Select a border color: "
                    />
                    <ChooseRouteAttrSelect
                        options={hoverOptions}
                        name="hoverBackground"
                        value={values.hoverBackground}
                        error={errors.hoverBackground}
                        touched={touched.hoverBackground}
                        isSubmitting={requestState.loading}
                        handleChange={handleChange}
                        labelText="Add a hover color: "
                        subLabelText="This field is set to none by default."
                    />
                    <ChooseRouteAttrSelect
                        options={marginOptions}
                        name="margin"
                        value={values.margin}
                        error={errors.margin}
                        touched={touched.margin}
                        isSubmitting={requestState.loading}
                        handleChange={handleChange}
                        labelText="Select amount of spacing:"
                    />
                    <PreviewButton values={values} />
                    <SubmitAddFormButton loading={requestState.loading} error={requestState.error} hasManyLinks={modalContentProps?.length >= 4}/>
                </Form>
            )}
        </Formik>
    )
}

export default AddRouteForm
