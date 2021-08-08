import React, { useState } from 'react';
import { circleSlashForCancelPaths, pencilIconFull, saveIcon } from '../../../constants/svg/svgs';
import SaveDiscardButtons from '../../utility/SaveDiscardButtons';
import { ITEM_TYPES } from '../../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { editItemSuccess } from '../../../redux/menus/menuActions';
import ItemDisplay from './ItemDisplay';
import ProgressBar from '../../utility/ProgressBar';
import ItemForm from './ItemForm';
import EditIconButton from '../../utility/EditIconButton';
import { updateMenuItem } from '../../../api';

const MenuItem = ({item, currentMenu, setSectionEdit, setSectionExit, sectionEdits, sectionIndex, itemIndex, updateId}) => {

    const dispatch = useDispatch();

    const initialState = {item: item.item, description: item.description, price: item.price, category: item.category, type: ""}

    const [form, setFormValues] = useState(initialState);
    const [formError, setFormError] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const menus = useSelector(state => state.menus.menuList);
    const menuContext = useSelector(state => state.menus.context)

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
        if (!form.item?.trim() || !form.category?.trim() || !form.price || !form.type){
            return setFormError("All form items must have valid values.");
        }
        if (form.description.trim().length > 100){
            return setFormError("Description cannot be greater than 100 characters long")
        }
        let price = parseFloat(form.price);
        if (price < 0) {
            return setFormError("Price cannot be less than 0.")
        }
        if (isNaN(price)) {
            return setFormError("Price must be a valid number")
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
            let menuIndex;
            let menuCopy = {...menus.find((menu, i) => {
                if (menu.name === menuContext.title){
                    menuIndex = i;
                    return menu;
                }
                return -1;
            })}
            menuCopy.menus[sectionIndex].items[itemIndex] = {...form};
            menuCopy.menus[sectionIndex].items[itemIndex].type = ITEM_TYPES.get(form.type);
            updateMenuItem(menuCopy, updateId)
            .then(() => {
                dispatch(editItemSuccess({menu: menuCopy, index: menuIndex}))
                setFormValues({...form, type: "" })
                setEditing(false)
                setSectionExit()
            })
            .catch(err => {
                setFormError('Could not edit item. Something went wrong.')
            })
            .finally(() => setFormLoading(false))
        }
        else {
            setFormLoading(false);
            return;
        }
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
                !editing ? <ItemDisplay item={item.item} price={`$${item.price}`} description={item.description} />
                : <ItemForm form={form} handleInputChange={handleInputChange} />
            }
            <div className={sectionEdits === 0 ? "align-flex-bottom" : ""}>
                {
                    !editing ? 
                    <EditIconButton variant="warning" icon={pencilIconFull}  text="Edit" className="mt-2" onClick={handleEditClick} />
                    : <SaveDiscardButtons saveChange={handleOnSave} discardChange={handleOnDiscard} saveIcon={saveIcon} discardIcon={circleSlashForCancelPaths} classes="mt-2"/>
                }
                { formError && editing && <small className="mt-2 text-danger">{formError}</small> }
                { formLoading && <ProgressBar className="menu-loading-container" color="secondary" /> }
            </div>
        </div>
    )
}

export default MenuItem
