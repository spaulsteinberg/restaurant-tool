import React, {useEffect, useState} from 'react'
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllMenus } from '../../../redux/menus/menuActions';
import FormSelectBox from '../../utility/FormSelectBox';
import LoadingSpinner from '../../utility/LoadingSpinner';

const Menu = () => {
    const dispatch = useDispatch();
    const menus = useSelector(state => state.menus.menuList);
    const current = useSelector(state => state.menus.current);
    const menuCall = useSelector(state => state.menus.get);

    const [selectedMenu, setSelectedMenu] = useState()

    const menuNames = menus.map(menu => {
        return {
            text: menu.name,
            highlight: menu.name === current.name ? true : false
        }
    })


    useEffect(() => {
        dispatch(loadAllMenus())
    }, [dispatch])

    const handleChange = (e) => {
        console.log(e.target.value)
        if (e.target.value !== selectedMenu) setSelectedMenu(e.target.value)
    }

    return (
        <div>
            { menuCall.loading && <LoadingSpinner alignment="centered">Loading Menus</LoadingSpinner> }
            { menuCall.success && <FormSelectBox options={menuNames} defaultText={'Choose a menu'} defaultValue={'Choose a menu'} changeFunction={handleChange}  method={2} defaultDisabled /> }
            { menuCall.error && <Alert variant="danger" className="mt-4">{menuCall.error}</Alert>}
        </div>
    )
}

export default Menu;
