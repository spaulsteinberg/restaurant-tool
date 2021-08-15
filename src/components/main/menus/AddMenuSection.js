import React, { useState, useRef } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { circleSlashForCancelPaths, saveIcon } from '../../../constants/svg/svgs'
import { addNewMenuSection } from '../../../redux/menus/menuActions'
import AddItemButton from '../../utility/AddItemButton'
import ProgressBar from '../../utility/ProgressBar'
import HeaderForm from './HeaderForm'

const AddMenuSection = ({updateKey, menuNames, isCurrent}) => {
    const ref = useRef();
    const blankState = {name: '', optionalMessage: ''}
    const blankFormState = {loading: false, error: ''}
    const addMenuRequest = useSelector(state => state.menus.add)
    const dispatch = useDispatch();

    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState(blankState)
    const [formState, setFormState] = useState(blankFormState)

    const validate = () => {
        if (!form.name || form.name.trim() === '') {
            setFormState(prevState => { return { ...prevState, error: 'Menu name cannot be blank', loading: false } });
            return false;
        }
        if (menuNames.includes(form.name.trim())) {
            setFormState(prevState => { return { ...prevState, error: 'Cannot have duplicate menu names', loading: false } });
            return false;
        }
        return true;
    }

    const handleEditingClick = () => {
        setEditing(true);
    }
    const handleInputChange = event => {
        let { name, value } = event.target;
        setForm({...form, [name]: value})
    }
    const handleOnSaveClick = e => {
        e.preventDefault();
        setFormState(blankFormState)
        if (validate()){
            setForm(blankState)
            setEditing(false)
            dispatch(addNewMenuSection(form.name.trim(), form.optionalMessage.trim(), isCurrent, updateKey))
        } else return;
    }
    const handleOnDiscardClick = e => {
        e.preventDefault();
        setEditing(false);
        setForm(blankState)
        setFormState(blankFormState)
    }
    return (
        <React.Fragment>
            <div className="add-section-button-container section-separator">
                <AddItemButton className="mt-4 menu-new-button" variant="primary" onClick={handleEditingClick}>Add Section</AddItemButton>
            </div>
            <div className="add-section-form-container">
                {editing && <HeaderForm 
                    fiRef={ref} 
                    form={form} 
                    handleInputChange={handleInputChange} 
                    saveClick={handleOnSaveClick} 
                    discardClick={handleOnDiscardClick}
                    saveIcon={saveIcon}
                    discardIcon={circleSlashForCancelPaths}/>
                }
                {formState.error && editing && <small className="mt-2 text-danger">{formState.error}</small>}
                {addMenuRequest.loading && <ProgressBar variant="indeterminate" className="m-3" color="secondary" />}
                {addMenuRequest.error && <Alert variant="danger" className="m-2 text-center">{addMenuRequest.error}</Alert>}
            </div>
        </React.Fragment>
    )
}

export default AddMenuSection
