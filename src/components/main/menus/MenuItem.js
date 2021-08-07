import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import { circleSlashForCancelPaths, pencilIconFull, saveIcon } from '../../../constants/svg/svgs';
import InputBox from '../../utility/InputBox';
import FormSelectBox from '../../utility/FormSelectBox';
import SaveDiscardButtons from '../../utility/SaveDiscardButtons';
import { ITEM_TYPES } from '../../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../firebase';
import { editItemSuccess } from '../../../redux/menus/menuActions';
import ItemDisplay from './ItemDisplay';
import ProgressBar from '../../utility/ProgressBar';

const MenuItem = ({item, currentMenu, setSectionEdit, setSectionExit, sectionEdits, mainMenuName, sectionIndex, itemIndex, updateId}) => {

    const dispatch = useDispatch();

    const initialState = {item: item.item, description: item.description, price: item.price, category: item.category, type: ""}

    const [form, setFormValues] = useState(initialState);
    const [formError, setFormError] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const menus = useSelector(state => state.menus.menuList);

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
                if (menu.name === mainMenuName){
                    menuIndex = i;
                    return menu;
                }
                return -1;
            })}
            menuCopy.menus[sectionIndex].items[itemIndex] = {...form};
            menuCopy.menus[sectionIndex].items[itemIndex].type = ITEM_TYPES.get(form.type);
            db.collection(process.env.REACT_APP_MENU_DB_COLLECTION)
            .doc(updateId)// set to update id
            .update({
                menus: menuCopy.menus
            })
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
                !editing ? 
                <ItemDisplay item={item.item} price={`$${item.price}`} description={item.description} />
                :
                <Form className="text-reset">
                    <FormGroup className="m-1">
                        <label>Item Name</label>
                        <InputBox name="item" type="text" value={form.item} onChange={handleInputChange} disabled/>
                    </FormGroup>
                    <FormGroup className="m-1">
                        <label>Description</label>
                        <InputBox name="description" type="text" value={form.description} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup className="m-1">
                        <label>Price</label>
                        <InputBox name="price" type="text" value={form.price} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup className="m-1">
                        <label>Category</label>
                        <InputBox name="category" type="text" value={form.category} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup className="m-1">
                        <label>This Item is a: </label>
                        <FormSelectBox options={[...ITEM_TYPES.keys()]} name="type" defaultText={""} defaultValue={""} changeFunction={handleInputChange} defaultDisabled={true}/>
                    </FormGroup>
                </Form>
            }
            <div className={sectionEdits === 0 ? "align-flex-bottom" : ""}>
                {
                    !editing ? 
                    <Button variant="warning" className="mt-2" onClick={handleEditClick}>{pencilIconFull}<span className="mx-2">Edit</span></Button>
                    : <SaveDiscardButtons saveChange={handleOnSave} discardChange={handleOnDiscard} saveIcon={saveIcon} discardIcon={circleSlashForCancelPaths} classes="mt-2"/>
                }
                { formError && editing && <small className="mt-2 text-danger">{formError}</small> }
                { formLoading && <ProgressBar className="menu-loading-container" color="secondary" /> }
            </div>
        </div>
    )
}

export default MenuItem
