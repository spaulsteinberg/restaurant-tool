import React, { useRef, useState } from 'react'
import { addRestaurantLink, removeRestaurantLink } from '../../../api'
import { useDispatch } from 'react-redux'
import { addRestaurantLinkAct, removeRestaurantLinkAct } from '../../../redux/home/homeActions'
import LinkDisplay from './LinkDisplay'
import LinkFormInput from './LinkFormInput'

const linkExists = (arr, link) => arr.find(ele => ele.url === link)

const isValidHttpUrl = url => {
    let _url;
    try {
        _url = new URL(url)
    } catch (_) {
        return false
    }
    return _url.protocol === "http:" || _url.protocol === "https:"
}

const stringIsNotEmpty = str => str && str.trim() && str.trim().length > 0

const lengthOver = (len, str) => str.length > len

const InputLinks = ({ links }) => {
    const [editable, setEditable] = useState(false)
    const [form, setForm] = useState({display: '', url: ''})
    const [submitState, setSubmitState] = useState({loading: false, success: null, error: {display: '', url: ''}})
    const [removeState, setRemoveState] = useState({isLoading: false, position: null }) // just have loading, not enough room for messages

    const dispatch = useDispatch()

    const ref = useRef()

    const handleSetEditable = () => setEditable(prev => !prev)

    const handleInputChange = event => setForm({...form, [event.target.name]: event.target.value})

    const handleSubmit = () => {
        if (lengthOver(30, form.display)) return setSubmitState({...submitState, success: null, error: {display: "Display name cannot be over 100 characters.", url: ''}})
        if (linkExists(links, form.url)) return setSubmitState({...submitState, success: null, error: {display: '', url: "Link already exists!"}})
        if (!isValidHttpUrl(form.url)) return setSubmitState({...submitState, success: null, error: {display: '', url: "Invalid format (http/https)."}})
        if (!stringIsNotEmpty(form.display)) return setSubmitState({...submitState, success: null, error: {display: "Link must have a display name.", url: ''}})

        setSubmitState({loading: true, success: null, error: {display: '', url: ''}})

        addRestaurantLink(form)
        .then(res => {
            dispatch(addRestaurantLinkAct(form))
            setForm({display: '', url: ''})
            setSubmitState({loading: false, success: true, error: {display: '', url: ''}})
            ref.current.focus()
        })
        .catch(err => {
            console.log(err)
            setSubmitState({loading: false, success: null, error: {display: '', url: 'Could not add link.'}})
        })
    }

    const handleDiscard = () => {
        setForm({display: '', url: ''})
        setSubmitState({loading: false, success: null, error: {display: '', url: ''}})
        setEditable(prev => !prev)
    }

    const handleRemoveLink = indx => {
        setRemoveState({isLoading: true, position: indx})
        let linksCopy = [...links]
        linksCopy = [...linksCopy.slice(0, indx), ...linksCopy.slice(indx + 1)]
        removeRestaurantLink(linksCopy)
        .then(res => {
            console.log("success!", res)
            dispatch(removeRestaurantLinkAct(linksCopy))
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => setRemoveState({isLoading: false, position: null}))
    }

    return (
        <React.Fragment>
            {
                editable ? 
                <LinkFormInput 
                    submitState={submitState} 
                    links={links} 
                    form={form}
                    loading={removeState} 
                    handleRemoveLink={handleRemoveLink}
                    handleInputChange={handleInputChange} 
                    handleSubmit={handleSubmit}
                    handleDiscard={handleDiscard}
                    mainRef={ref}/>
                : <LinkDisplay 
                    links={links}  
                    loading={removeState} 
                    handleSetEditable={handleSetEditable} 
                    handleRemoveLink={handleRemoveLink}/>
            }
        </React.Fragment>

    )
}

export default InputLinks
