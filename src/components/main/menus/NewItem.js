import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMenuItemToSection } from '../../../api'
import { FOOD_KEY, ITEM_TYPES } from '../../../constants/constants'
import { addItemSuccess } from '../../../redux/menus/menuActions'
import { validateDescription, validateFormItemsExist, validatePrice } from '../../../utils'
import ProgressBar from '../../utility/ProgressBar'
import SaveDiscardButtons from '../../utility/SaveDiscardButtons'
import ItemForm from './ItemForm'

const NewItem = ({onDiscard, sectionIndex, currentMenu, isCurrent, updateId}) => {
    const context = useSelector(state => state.menus.context.title);
    const menuList = useSelector(state => [...state.menus.menuList])
    const dispatch = useDispatch();

    const blankState = {item: '', description: '', price: '', category: '', type: ''}
    const [form, setForm] = useState(blankState)
    const [formActions, setFormActions] = useState({error: '', loading: false})

    const validate = () => {
        if (!validateFormItemsExist(form)){
            return setFormActions({error: "All form items must have valid values.", loading: false});
        }
        if (validateDescription(form.description)){
            return setFormActions({error: "Description cannot be greater than 100 characters long", loading: false})
        }
        if (validatePrice(parseFloat(form.price))) {
            return setFormActions({error: "Price must be a valid number cannot be less than 0.", loading: false})
        }
        if (currentMenu.items.find(i => i.item.toLowerCase() === form.item.trim().toLowerCase())) {
            return setFormActions({error: "Cannot add duplicate item names on same menu section.", loading: false})
        }
        return true;
    }

    const handleInputChange = event => {
        let { name, value } = event.target;
        setForm({...form, [name]: value})
    }

    const handleSaveClick = event => {
        event.preventDefault();
        console.log("save click")
        setFormActions({error: '', loading: true})
        if (validate()) {
            const index = menuList.findIndex(menu => menu.name === context);
            form.type = ITEM_TYPES.get(form.type) ? ITEM_TYPES.get(form.type) : FOOD_KEY;
            menuList[index].menus[sectionIndex].items.push(form)
            addMenuItemToSection(menuList[index].menus, updateId)
                .then(() => {
                    dispatch(addItemSuccess({ index: index, list: menuList, isCurrent: isCurrent }))
                    setFormActions({ error: '', loading: false })
                    onDiscard(event);
                })
                .catch(err => {
                    setFormActions({ error: 'Something went wrong. Please try again.', loading: false })
                })
        }
    }
    return (
        <div className="new-item-form-container">
            <ItemForm form={form} handleInputChange={handleInputChange} newForm/>
            <SaveDiscardButtons classes="mt-2" discardChange={onDiscard} saveChange={handleSaveClick} />
            {formActions.error ? <small className="mt-2 text-danger">{formActions.error}</small> : null}
            {formActions.loading ? <ProgressBar className="menu-loading-container" color="secondary" /> : null}
        </div>
    )
}
export default NewItem
