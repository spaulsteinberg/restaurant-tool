import React, { useState } from 'react'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import FormGroup from 'react-bootstrap/FormGroup'
import EditIconButton from '../../utility/EditIconButton'
import SaveDiscardButtons from '../../utility/SaveDiscardButtons'
import { addRestaurantLink } from '../../../api'
import { useDispatch } from 'react-redux'
import { addRestaurantLinkAct } from '../../../redux/home/homeActions'
import Disclaimer from '../../utility/Disclaimer'
import LoadingSpinner from '../../utility/LoadingSpinner'

const linkExists = (arr, link) => arr.includes(link)

const isValidHttpUrl = url => {
    let _url;
    try {
        _url = new URL(url)
    } catch (_) {
        return false
    }
    return _url.protocol === "http:" || _url.protocol === "https:"
}

const InputLinks = ({ links }) => {
    const [editable, setEditable] = useState(false)
    const [inputLink, setInputLink] = useState('')
    const [submitState, setSubmitState] = useState({loading: false, success: null, error: null})

    const dispatch = useDispatch()

    const handleSetEditable = () => setEditable(prev => !prev)

    const handleInputChange = event => setInputLink(event.target.value)

    const handleSubmit = () => {
        if (linkExists(inputLink, links)) return setSubmitState({...submitState, success: null, error: 'Link already exists!'})
        if (!isValidHttpUrl(inputLink)) return setSubmitState({...submitState, success: null, error: "Invalid format (http/https)"})

        setSubmitState({loading: true, success: null, error: null})

        addRestaurantLink(inputLink)
        .then(res => {
            dispatch(addRestaurantLinkAct(inputLink))
            setInputLink('')
            setSubmitState({loading: false, success: true, error: null})
        })
        .catch(err => {
            console.log(err)
            setSubmitState({loading: false, success: null, error: 'Could not add link.'})
        })
    }

    const handleDiscard = () => {
        setInputLink('')
        setSubmitState({loading: false, success: null, error: null})
        setEditable(prev => !prev)
    }
    return (
        <React.Fragment>
            {
                editable ?
                <FormGroup className="my-2 home-links-input">
                    <FormLabel className="home-label-text pt-0">Links</FormLabel>
                    <ul>
                        {
                            links.map(link => <li key={link}>{link}</li>)
                        }
                    </ul>
                    <FormLabel >Add a link: </FormLabel>
                    <FormControl className={submitState.error && "error-input-box"} value={inputLink} onChange={handleInputChange} />
                    { submitState.error && <Disclaimer classes="text-danger">{submitState.error}</Disclaimer>}
                    {
                        submitState.loading ?
                        <div className="spinner-align-desc">
                                <LoadingSpinner alignment="centered" variant="primary" />
                            </div>
                        : 
                        <div className="description-input-button-container justify-content-center">
                            <SaveDiscardButtons saveChange={handleSubmit} discardChange={handleDiscard} classes="mt-1" />
                        </div>
                    }
                </FormGroup>
                :
                <div className="my-2 home-links-input">
                    <div className="link-edit-container">
                    <FormLabel className="home-label-text pt-0">Edit Links</FormLabel>
                    <EditIconButton text="" onClick={handleSetEditable} />
                    </div>
                    <ul>
                        {
                            links.map(link => <li key={link}>{link}</li>)
                        }
                    </ul>
                </div>
            }
        </React.Fragment>

    )
}

export default InputLinks
