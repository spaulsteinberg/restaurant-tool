import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from 'react-bootstrap/FormGroup';
import InputBox from '../../utility/InputBox';
import SaveButton from '../../utility/SaveButton';
import RemoveItemButton from '../../utility/RemoveItemButton';
import ProgressBar from '../../utility/ProgressBar';
import { circleSlashForCancelPaths } from '../../../constants/svg/svgs';
import { addInventoryItemReq } from '../../../api';
import { useDispatch } from 'react-redux';
import { addInventoryItem } from '../../../redux/inventory/inventoryActions';


const InventoryAddModal = ({show, handleClose, itemsPresent}) => {
    const dispatch = useDispatch();
    const initialState = {consumable: '', count: '', cost: '', category: '', subCategory: ''}
    const initialRequestState = {error: '', loading: false}
    const [form, setForm] = useState(initialState)
    const [requestState, setRequestState] = useState(initialRequestState)
    const formLabelMap = new Map([
        ["consumable", "Item"],
        ["count", "Number/Items"],
        ["cost", "Price/Item"],
        ["category", "Categorize (?)"],
        ["subCategory", "Sub-Categorize (?)"]
    ])

    const handleOnClose = event => {
        event.preventDefault();
        setForm(initialState);
        setRequestState(initialRequestState);
        handleClose();
    }

    const clearFormAndClose = () => {
        setForm(initialState);
        setRequestState(initialRequestState);
        handleClose();
    }

    const handleOnChange = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const renderForm = () => {
        let formFields = [];
        for (const field in form){
            formFields.push(
                <FormGroup key={field}>
                    <label>{formLabelMap.get(field)}</label>
                    <InputBox type="text" name={field} value={form[field]} onChange={handleOnChange} />
                </FormGroup>
            )
        }
        return (<>{formFields.map(item => item)}</>)
    }

    const validate = () => {
        try {
            if (!form.consumable || !form.consumable.trim()) {
                setRequestState({loading: false, error: 'Invalid item name.'})
                return false;
            }
            let itemIsAlreadyPresent = false;
            for (let item of itemsPresent){
                if (item.trim().toLowerCase() === form.consumable.trim().toLowerCase()) {
                    itemIsAlreadyPresent = true;
                    break;
                }
            }
            if (itemIsAlreadyPresent){
                setRequestState({loading: false, error: 'Item already exists!'})
                return false;
            }
            else if (isNaN(form.cost)) {
                setRequestState({loading: false, error: 'Price/Item must be a valid number.'})
                return false;
            } else if (isNaN(form.count)) {
                setRequestState({loading: false, error: 'Number of items must be a valid number.'})
                return false;
            } else if (parseFloat(form.cost) > Number.MAX_SAFE_INTEGER || parseInt(form.count) > Number.MAX_SAFE_INTEGER){
                setRequestState({loading: false, error: 'Cost or count is too large.'})
                return false;            
            }
            return true;
        } catch (err) {
            setRequestState({loading: false, error: 'Something went wrong.'})
            return false;
        }
    }

    const handleOnSubmit = () => {
        if (validate()){
            setRequestState({loading: true, error: ''})
            const requestObj = {
                ...form,
                count: parseInt(form.count),
                cost: parseFloat(form.cost)
            }
            addInventoryItemReq(requestObj)
            .then(dref => {
                dispatch(addInventoryItem({id: requestObj.consumable, data: {...requestObj, id: dref.id}}))
                setRequestState({loading: false, error: ''})
                clearFormAndClose();
            })
            .catch(err => {
                setRequestState({loading: false, error: 'Error occurred sending request.'})
            })
        }
    }
    
    return (
        <Dialog open={show} onClose={handleOnClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className="text-center">Add Inventory Item</DialogTitle>
            <DialogContent>
                <div className="my-2 inventory-modal-styles">
                    {renderForm()}
                </div>
            </DialogContent>
            <DialogActions>
                <RemoveItemButton icon={circleSlashForCancelPaths} className="dialog-action-button-overrides" onClick={handleOnClose} />
                <SaveButton onClick={handleOnSubmit} className="ml-2 dialog-action-button-overrides" />
            </DialogActions>
            {
                requestState.loading &&
                    <div className="dialog-action-loading-container">
                        <ProgressBar variant="indeterminate" color="secondary" />
                    </div>
            }
            {
                requestState.error &&
                    <div className="dialog-action-loading-container text-center">
                        <small className="text-danger">{requestState.error}</small>
                    </div>
            }
        </Dialog>
    )
}

export default InventoryAddModal
