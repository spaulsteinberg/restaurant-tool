import React, { useState } from 'react';
import { circleSlashForCancelPaths, pencilOutlineSmallFull, saveIcon, trashSmallIcon } from '../../../constants/svg/svgs';
import SaveDiscardButtons from '../../utility/SaveDiscardButtons';
import { ITEM_TYPES } from '../../../constants/constants';
import { useDispatch } from 'react-redux';
import { deleteItemSuccess, editItemSuccess } from '../../../redux/menus/menuActions';
import ItemDisplay from './ItemDisplay';
import ProgressBar from '../../utility/ProgressBar';
import ItemForm from './ItemForm';
import EditIconButton from '../../utility/EditIconButton';
import { updateMenuItem, updateMenuItemsInSection } from '../../../api';
import { validateDescription, validateFormItemsExist, validatePrice } from '../../../utils';
import RemoveItemButton from '../../utility/RemoveItemButton';

const MenuItem = ({item, currentMenu, setSectionEdit, setSectionExit, isCurrent, sectionEdits, sectionIndex, itemIndex, menus, menuIndex, editable, updateId}) => {

    const dispatch = useDispatch();

    const initialState = {item: item.item, description: item.description, price: item.price, category: item.category, type: ""}

    const [form, setFormValues] = useState(initialState);
    const [formError, setFormError] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const handleEditClick = e => {
        e.preventDefault();
        setEditing(prevState => !prevState);
        setSectionEdit()
        setFormError('');
    }

    const handleInputChange = event => {
        let { name, value } = event.target;
        setFormValues({...form, [name]: value})
    }

    const validate = () => {
        if (!validateFormItemsExist(form)){
            return setFormError("All form items must have valid values.");
        }
        if (validateDescription(form.description)){
            return setFormError("Description cannot be greater than 100 characters long")
        }
        if (validatePrice(parseFloat(form.price))) {
            return setFormError("Price must be a valid number cannot be less than 0.")
        }

        // if the item isnt the same item and the item is already in the menu it exists.
        let itemAlreadyExists = currentMenu.items.find(i => i.item.toLowerCase() !== initialState.item.toLowerCase() && i.item.toLowerCase() === form.item.trim().toLowerCase());
        if (itemAlreadyExists) return setFormError("Cannot add duplicate item names on same menu section.")
        return true;
    }

    const handleOnSave = e => {
        e.preventDefault();
        setFormError('');
        setFormLoading(true);
        if (validate()) {
            menus[menuIndex].menus[sectionIndex].items[itemIndex] = {...form};
            menus[menuIndex].menus[sectionIndex].items[itemIndex].type = ITEM_TYPES.get(form.type);
            updateMenuItem(menus[menuIndex], updateId)
            .then(() => {
                dispatch(editItemSuccess({menu: menus[menuIndex], index: menuIndex}))
                setFormValues({...form, type: "" })
                setEditing(false)
                setSectionExit()
            })
            .catch(() => setFormError('Could not edit item. Something went wrong.'))
            .finally(() => setFormLoading(false))
        }
        else {
            setFormLoading(false);
            return;
        }
    }

    const handleOnDelete = e => {
        e.preventDefault();
        setFormLoading(true)
        menus[menuIndex].menus[sectionIndex].items.splice(itemIndex, 1);
        updateMenuItemsInSection(menus[menuIndex].menus, updateId)
        .then(() => {
            setFormLoading(false)
            dispatch(deleteItemSuccess({updatedMenuList: [...menus], currentItem: menus[menuIndex], isCurrent: isCurrent}))
        })
        .catch(err => setFormLoading(false))
    }
    const handleOnDiscard = e => {
        e.preventDefault();
        setFormValues(initialState);
        setEditing(false);
        setSectionExit()
    }

    return (
        <div key={item.item} className="menu-item-column">
            {
                !editing || !editable ? <ItemDisplay item={item.item} price={`$${item.price}`} description={item.description} />
                : <ItemForm form={form} handleInputChange={handleInputChange} />
            }
            {
                editable ? 
                <div className={sectionEdits === 0 ? "align-flex-bottom" : ""}>
                {
                    !editing ? 
                    <React.Fragment>
                        <EditIconButton variant="info" icon={pencilOutlineSmallFull} text={null} className="mt-2" onClick={handleEditClick} />
                        <RemoveItemButton className="mt-2 mx-2" icon={trashSmallIcon} onClick={handleOnDelete} />
                    </React.Fragment>
                    : <SaveDiscardButtons saveChange={handleOnSave} discardChange={handleOnDiscard} saveIcon={saveIcon} discardIcon={circleSlashForCancelPaths} classes="mt-2"/>
                }
                { formError && editing && <small className="mt-2 text-danger">{formError}</small> }
                { formLoading && <ProgressBar className="menu-loading-container" color="secondary" /> }
                </div>
                 : null 
            }
        </div>
    )
}

export default MenuItem
