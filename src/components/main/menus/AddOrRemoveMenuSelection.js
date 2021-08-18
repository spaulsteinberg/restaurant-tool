import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { Paper } from '@material-ui/core';
import RemoveMenuForm from './RemoveMenuForm';
import { useDispatch } from 'react-redux';
import { postDeleteMainMenu } from '../../../redux/menus/menuActions';

const resetKeyValues = (obj) => {
    for (const key of Object.keys(obj)){
        obj[key] = false;
    }
    return obj;
}

const AddOrRemoveMenuSelection = ({menus, current}) => {

    
    const initalRemoveFormState = {errors: null}

    const dispatch = useDispatch();

    const [removeCheckValues, setRemoveCheckValues] = useState({});
    const [removeConfirm, setRemoveConfirm] = useState("")
    const [removeState, setRemoveState] = useState(false);
    const [removeFormState, setRemoveFormState] = useState(initalRemoveFormState)
    const [addState, setAddState] = useState(false);
    const [aorEdit, setAorEdit] = useState(false);

    const setInitialNames = useCallback(() => {
        let initialRemoveState = {}
        const names = menus.map(menu => menu.name)
        names.map(name => initialRemoveState[name] = false)
        setRemoveCheckValues(initialRemoveState)
    }, [menus])

    useEffect(() => {
        setInitialNames()
    }, [setInitialNames])
    
    const handleCheckClick = event => {
        event.stopPropagation();
        setRemoveCheckValues(prevState => {return {...prevState, [event.target.name]: event.target.checked}})
    }

    const handleConfirmChange = event => setRemoveConfirm(event.target.value)

    const handleAorClick = event => {
        event.preventDefault();
        const {type, tagName, name} = event.target;
        if (type === "checkbox" || tagName === "LABEL" || name === "checkbox-wrapper") return;
        setAorEdit(true)
    }

    const handleAddClick = event => {
        event.stopPropagation();
        setRemoveState(false);
        setAddState(true);
    }

    const handleRemoveClick = event => {
        event.stopPropagation();
        setAddState(false);
        setRemoveState(true);
    }

    const handleSaveClick = event => {
        event.stopPropagation();
        event.preventDefault();
        if (removeConfirm?.trim()?.toLowerCase() !== "yes") return setRemoveFormState({errors: "Must confirm your selections by typing 'yes'"})

        let removeList = Object.keys(removeCheckValues).filter(val => removeCheckValues[val] !== false)

        if (removeList.includes(current.name)) return setRemoveFormState({errors: "Cannot remove a current menu."})

        setRemoveFormState({errors: '', loading: true});

        const menuListCopy = [...menus];
        const updateIds = []
        removeList.forEach(element => {
            let index = menuListCopy.findIndex(m => m?.name === element);
            updateIds.push(menuListCopy[index].id)
            menuListCopy.splice(index, 1)
        })
        setRemoveConfirm("");
        dispatch(postDeleteMainMenu(menuListCopy, updateIds))
    }

    const handleDiscardClick = event => {
        event.stopPropagation();
        event.preventDefault();
        setRemoveCheckValues(resetKeyValues({...removeCheckValues}))
        setAddState(false);
        setRemoveState(false);
        setRemoveConfirm("");
        setRemoveFormState(initalRemoveFormState)
        setAorEdit(prevState => !prevState)
    }
    
    return (
        <Paper className="menu-home-main-paper" onClick={handleAorClick} 
            style={
                { backgroundColor: aorEdit ? "#fff" : "#f06292",
                 opacity: aorEdit && 1 }
            }>
            {
                aorEdit ?
                <React.Fragment>
                    {
                        removeState || addState ? null :
                        <div className="add-remove-menu-btn-containers">
                            <Button variant="primary" size="lg" className="m-1 button-item" onClick={handleAddClick}>Add</Button>
                            <Button variant="danger" size="lg" className="m-1 button-item" onClick={handleRemoveClick}>Remove</Button>
                        </div>
                    }
                    {
                        removeState ? 
                            <RemoveMenuForm 
                                save={handleSaveClick} 
                                discard={handleDiscardClick} 
                                values={removeCheckValues}
                                handleClick={handleCheckClick}
                                removeValue={removeConfirm}
                                handleConfirmChange={handleConfirmChange}
                                formState={removeFormState}/> 
                        : addState ? <p>add state nah</p>
                        : null
                    }
                </React.Fragment>
                    : <Button variant="outline-light" size="lg" className="w-50">Add or Remove Menus</Button>
            }
        </Paper>
    )
}

export default AddOrRemoveMenuSelection
