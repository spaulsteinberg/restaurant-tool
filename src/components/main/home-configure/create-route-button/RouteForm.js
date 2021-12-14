import React, { useState, useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'
import ChooseRouteAttrSelect from './ChooseRouteAttrSelect'
import ChooseRouteAttrInput from './ChooseRouteAttrInput'
import PreviewButton from './PreviewButton'
import SubmitAddFormButton from './SubmitAddFormButton'
import { addGotoLink, editGotoLink } from '../../../../api'
import { useDispatch, useSelector } from 'react-redux'
import { addGotoLinkAct, editGotoLinkAct } from '../../../../redux/home/homeActions'

const translateMarginField = (values, opts) => {
    const request = {...values}
    request.margin = values.margin === opts[0] ? 1 : values.margin === opts[1] ? 2 : values.margin === opts[2] ? 3 : 4
    return request;
}

const RouteForm = ({handleOnClose, modalContentProps, initState = null}) => {

    const formRef = useRef()
    const dispatch = useDispatch()
    const [requestState, setRequestState] = useState({loading: false, error: null})
    const gotos = useSelector(state => state.home.data.gotos)

    const marginOptions = ["Small", "Medium", "Large", "X-Large"]

    const colorOptions = ["primary", "secondary", "danger", "warning", "info", "light", "dark", "muted", "white"]

    const backgroundOptions = [...colorOptions, "transparent"]

    const hoverOptions = ["none", ...colorOptions]
    
    const initialState = {
        route: initState ? initState.route : '', //input field
        text: initState ? initState.text : '', //select field
        background: initState ? initState.background : 'transparent', // select field
        border: initState ? initState.border : '', //select field
        display: initState ? initState.display : '', // input field
        hoverBackground: initState ? initState.hoverBackground : 'none', //select field
        margin: !initState ? '' : initState.margin === 1 ? marginOptions[0] : initState.margin === 2 ? marginOptions[1] : initState.margin === 3 ? marginOptions[2] : initState.margin === 4 ? marginOptions[3] : '', //select field
    }

    const handleAddButtonSubmit = values => {
        if (modalContentProps?.length >= 4) return
        if (modalContentProps.includes(values.display)) return setRequestState({loading: false, error: `You already have a link named ${values.display}!`})
        setRequestState({loading: true, error: null})
        const request = translateMarginField(values, marginOptions)
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
    }

    const handleEditButtonSubmit = values => {
        const indx = gotos.findIndex(goto => goto.display === initState.display);
        const gotoCopy = [...gotos]
        const gotoCopyNames = [...gotos.filter((g, i) => i !== indx).map(g => g.display)]
        if (gotoCopyNames.includes(values.display)) return setRequestState({loading: false, error: `You already have a link named ${values.display}!`})
        setRequestState({loading: true, error: null})
        const request = translateMarginField(values, marginOptions)
        gotoCopy[indx] = request
        editGotoLink(gotoCopy)
        .then(res => {
            console.log("edit success!")
            dispatch(editGotoLinkAct(gotoCopy))
            setRequestState({loading: false, error: null})
            handleOnClose()
        })
        .catch(err => {
            console.log(err)
            setRequestState({loading: false, error: 'An error occurred! Please try again.'})
        })
    }

    return (
        <Formik
            innerRef={formRef}
            initialValues={initialState}
            onSubmit={(values) => { 
                // initState will be null when adding a button
                initState ? handleEditButtonSubmit(values) : handleAddButtonSubmit(values);
            }}
            validationSchema={Yup.object().shape({
                route: Yup.string().trim().required("Please enter a valid relative route."),
                display: Yup.string().required("Please enter a display name.")
                    .min(2, "Must be at least two characters long.")
                    .max(20, "Cannot be more than 15 characters long."),
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
                    <SubmitAddFormButton loading={requestState.loading} error={requestState.error} hasManyLinks={modalContentProps?.length >= 4 && !initState}/>
                </Form>
            )}
        </Formik>
    )
}

export default RouteForm
