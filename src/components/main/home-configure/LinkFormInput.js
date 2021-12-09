import React, { useEffect } from 'react'
import FormLabel from 'react-bootstrap/FormLabel'
import FormGroup from 'react-bootstrap/FormGroup'
import LoadButtonState from './LoadButtonState'
import LinkDisplayList from './LinkDisplayList'
import LinkFormInputFields from './LinkFormInputFields'

const LinkFormInput = ({submitState, links, form, loading, handleRemoveLink, handleInputChange, handleSubmit, handleDiscard, mainRef}) => {

    useEffect(() => {
        mainRef?.current?.focus()
    }, [mainRef])

    return (
        <FormGroup className="my-2 home-links-input">
            <FormLabel className="home-label-text pt-0">Links</FormLabel>
            <LinkDisplayList links={links} loading={loading} handleRemoveLink={handleRemoveLink}/>
            <LinkFormInputFields text="Add a display name:" error={submitState.error.display} name="display" value={form.display} handleInputChange={handleInputChange} ref={mainRef} />
            <LinkFormInputFields text="Add a link URL:" error={submitState.error.url} name="url" value={form.url} handleInputChange={handleInputChange} />
            <LoadButtonState
                state={submitState.loading}
                spinnerClasses="spinner-align-desc"
                spinnerVariant="primary"
                spinnerAlign="centered"
                buttonContClasses="description-input-button-container justify-content-center"
                onSave={handleSubmit}
                onDiscard={handleDiscard} />
        </FormGroup>
    )
}

export default LinkFormInput
