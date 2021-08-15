import React, {useEffect, useState} from 'react'
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllMenus, updateContext } from '../../../redux/menus/menuActions';
import LoadingSpinner from '../../utility/LoadingSpinner';
import ViewMenu from './ViewMenu';

const Menu = () => {
    const dispatch = useDispatch();
    const menus = useSelector(state => state.menus.menuList);
    const current = useSelector(state => state.menus.current);
    const menuCall = useSelector(state => state.menus.get);

    const [selectedMenu, setSelectedMenu] = useState(null);

    let menuNames = menus.map(menu => {
        return {
            text: menu.name,
            highlight: menu.name === current.name ? true : false
        }
    })

    const defaultText = [{text: "Choose a menu", highlight: false}];
    menuNames = defaultText.concat(menuNames)


    useEffect(() => {
        dispatch(loadAllMenus())
    }, [dispatch])

    const handleMenuDropdownChange = (e) => {
        const {value} = e.target;
        if (value !== selectedMenu?.name && value !== menuNames[0].text) {
            let selected = menus.find(menu => menu.name === value);
            setSelectedMenu(selected)
            dispatch(updateContext({title: value, message: selected.optionalMessage}))
        }
    }

    return (
        <div>
            { menuCall.loading ? <LoadingSpinner alignment="centered" marginTop="2rem">Loading Menus</LoadingSpinner>
              : menuCall.success ? <ViewMenu names={menuNames} selected={selectedMenu?.name} handleMenuChange={handleMenuDropdownChange} menu={selectedMenu} menus={menus}/> 
              : menuCall.error ? <Alert variant="danger" className="mt-4">{menuCall.error}</Alert>
              : null
            }
        </div>
    )
}

export default Menu;
