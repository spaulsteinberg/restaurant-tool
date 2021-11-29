import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import RemoveMenuForm from './RemoveMenuForm';
import { useDispatch } from 'react-redux';
import { addMainMenuSuccess, postDeleteMainMenu } from '../../../redux/menus/menuActions';
import AddMainMenuForm from './AddMainMenuForm';
import { validateDescription } from '../../../utils';
import { addMainMenuToMenuList } from '../../../api';
import { useHistory } from 'react-router-dom';
import MenuSelectionItem from './MenuSelectionItem';
import MenuSelectionButton from './MenuSelectionButton';

const resetKeyValues = (obj) => {
    for (const key of Object.keys(obj)){
        obj[key] = false;
    }
    return obj;
}

const AddOrRemoveMenuSelection = ({menus, current}) => {

    const initalRemoveFormState = {errors: null}

    const dispatch = useDispatch();
    const history = useHistory();

    /* Remove menu states */
    const [removeCheckValues, setRemoveCheckValues] = useState({});
    const [removeConfirm, setRemoveConfirm] = useState("")
    const [removeState, setRemoveState] = useState(false);
    const [removeFormState, setRemoveFormState] = useState(initalRemoveFormState)

    /* Add menu states */
    const initialAddState = {name: "", description: "", redirect: true}
    const initialAddFormState = {loading: false, success: null, errors: ""}
    const [addState, setAddState] = useState(false);
    const [addFormRequestState, setAddFormRequestState] = useState(initialAddFormState)
    const [addFormState, setAddFormState] = useState(initialAddState)
    const [currentMenuNames, setCurrentMenuNames] = useState([])

    /* main page states */
    const [aorEdit, setAorEdit] = useState(false);

    const setInitialNames = useCallback(() => {
        let initialRemoveState = {}
        const names = menus.map(menu => menu.name)
        names.map(name => initialRemoveState[name] = false)
        setRemoveCheckValues(initialRemoveState)
        setCurrentMenuNames(names)
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
        if (removeState){
            setRemoveCheckValues(resetKeyValues({...removeCheckValues}))
            setRemoveConfirm("");
            setRemoveFormState(initalRemoveFormState)
        } else {
            setAddFormState(initialAddState);
            setAddFormRequestState(initialAddFormState)
        }
        setAddState(false);
        setRemoveState(false);
        setAorEdit(prevState => !prevState)
    }

    const handleAddInputChange = event => setAddFormState({...addFormState, [event.target.name]: event.target.value})

    const handleRedirectCheckClick = event => {
        event.stopPropagation();
        const {name, checked} = event.target;
        setAddFormState({...addFormState, [name]: checked})
    }

    const validateAddForm = () => {
        if (!addFormState.name?.trim()) {
            setAddFormRequestState({errors: "Must have a valid menu name", loading: false})
            return false;
        }
        if (currentMenuNames.includes(addFormState.name.trim())){
            setAddFormRequestState({errors: `Menu name ${addFormState.name} already exists!`, loading: false})
            return false;
        }
        if (addFormState.description && (addFormState.description.trim().length === 0 || validateDescription(addFormState.description))){
            setAddFormRequestState({errors: "Description must be between 1-100 characters", loading: false})
            return false;
        }
        return true;
    }
    
    const handleAddSaveMenuClick = event => {
        event.preventDefault();
        setAddFormRequestState({loading: true, success: null, errors: null})
        if (validateAddForm()){
            const name = addFormState.name.trim()
            const description = addFormState.description ? addFormState.description?.trim() : ""
            addMainMenuToMenuList(name, description)
            .then(doc => {
                // if there is a check for redirect, redirect and put into context
                setAddFormRequestState({loading: false, success: true, errors: null})
                const newMenu = { 
                    name: name, 
                    optionalMessage: description,
                    current: false,
                    menus: [],
                    id: doc.id
                }
                dispatch(addMainMenuSuccess(newMenu));
                if (addFormState.redirect) {
                    history.push('/menus/view', {name: name, description: description, showMenu: newMenu})
                }
            })
            .catch(err => {
                setAddFormRequestState({loading: false, success: false, errors: 'Something went wrong adding the menu. Please try again.'})
            })
        }
    }
    
    return (
        <MenuSelectionItem className="menu-home-main-paper" onClick={handleAorClick} 
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
                        : addState ? 
                            <AddMainMenuForm
                                save={handleAddSaveMenuClick}
                                discard={handleDiscardClick}
                                handleInputChange={handleAddInputChange}
                                handleCheckClick={handleRedirectCheckClick}
                                values={addFormState}
                                formState={addFormRequestState}
                             />
                        : null
                    }
                </React.Fragment>
                    : <MenuSelectionButton handleClick={() => {}} buttonText="Add or Remove Menus" />
            }
        </MenuSelectionItem>
    )
}

export default AddOrRemoveMenuSelection
