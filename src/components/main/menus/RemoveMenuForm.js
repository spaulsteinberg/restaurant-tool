import React from 'react'
import {useSelector} from 'react-redux';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl';
import { FormGroup } from '@material-ui/core'
import LoadingSpinner from '../../utility/LoadingSpinner'
import SaveDiscardButtons from '../../utility/SaveDiscardButtons'

const RemoveMenuForm = ({values, removeValue, handleConfirmChange, handleClick, formState, save, discard}) => {
    const mainDeleteState = useSelector(state => state.menus.deleteMain)

    return (
        <Form>
            <div className="check-style" id="checkbox-wrapper">
                {Object.keys(values).map(k => <Form.Check key={k} inline label={k} defaultChecked={values[k]} name={k} type="checkbox" onClick={handleClick} disabled={mainDeleteState.loading}/>)}
                <FormGroup className="mt-3">
                    <label className="text-danger">Are you sure you want to delete these menus? (Yes to proceed)</label>
                    <FormControl type="text" value={removeValue} onChange={handleConfirmChange}/>
                </FormGroup>        
                <SaveDiscardButtons saveChange={save} discardChange={discard} classes="mt-3"/>
                {
                    mainDeleteState.loading && 
                    <div className="mt-3">
                        <LoadingSpinner variant="danger" alignment="centered" className="m-3">Removing...</LoadingSpinner>
                    </div>
                }
                {
                    formState.errors && <small className="text-danger">{formState.errors}</small>
                }
                {
                    !mainDeleteState.loading && mainDeleteState.error && !formState.errors && <small className="text-danger">{mainDeleteState.error}</small>
                }
            </div>
        </Form>
    )
}

export default RemoveMenuForm
