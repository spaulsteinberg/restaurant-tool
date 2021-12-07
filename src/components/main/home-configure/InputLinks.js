import React, { useState } from 'react'
import { addRestaurantLink } from '../../../api'
import { useDispatch } from 'react-redux'
import { addRestaurantLinkAct } from '../../../redux/home/homeActions'
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

const InputLinks = ({ links }) => {
    const [editable, setEditable] = useState(false)
    const [form, setForm] = useState({display: '', url: ''})
    const [submitState, setSubmitState] = useState({loading: false, success: null, error: {display: '', url: ''}})

    const dispatch = useDispatch()

    const handleSetEditable = () => setEditable(prev => !prev)

    const handleInputChange = event => setForm({...form, [event.target.name]: event.target.value})

    const handleSubmit = () => {
        if (linkExists(links, form.url)) return setSubmitState({...submitState, success: null, error: {display: '', url: "Link already exists!"}})
        if (!isValidHttpUrl(form.url)) return setSubmitState({...submitState, success: null, error: {display: '', url: "Invalid format (http/https)"}})
        if (!stringIsNotEmpty(form.display)) return setSubmitState({...submitState, success: null, error: {display: "Link must have a display name.", url: ''}})

        setSubmitState({loading: true, success: null, error: {display: '', url: ''}})

        addRestaurantLink(form)
        .then(res => {
            dispatch(addRestaurantLinkAct(form))
            setForm({display: '', url: ''})
            setSubmitState({loading: false, success: true, error: {display: '', url: ''}})
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
    return (
        <React.Fragment>
            {
                editable ? 
                <LinkFormInput 
                    submitState={submitState} 
                    links={links} 
                    form={form}
                    handleInputChange={handleInputChange} 
                    handleSubmit={handleSubmit}
                    handleDiscard={handleDiscard}/>
                : <LinkDisplay handleSetEditable={handleSetEditable} links={links} />
                
            }
        </React.Fragment>

    )
}

export default InputLinks
