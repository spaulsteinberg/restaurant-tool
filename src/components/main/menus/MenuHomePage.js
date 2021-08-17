import React, { useEffect, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllMenus } from '../../../redux/menus/menuActions'
import LoadingSpinner from '../../utility/LoadingSpinner'
import { Alert } from 'react-bootstrap'
import HomeCurrentSelection from './HomeCurrentSelection'
import AddOrRemoveMenuSelection from './AddOrRemoveMenuSelection'

const MenuHomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const menuFetch = useSelector(state => state.menus.get);
    const menuList = useSelector(state => [...state.menus.menuList]);

    const callFetchMenus = useCallback(
        () => {
            if (!menuFetch.success) {
                dispatch(loadAllMenus())
            }
        },
        [dispatch, menuFetch.success],
    )

    useEffect(() => {
        callFetchMenus()
    }, [callFetchMenus])

    const [aorEdit, setAorEdit] = useState(false);

    const handleAorClick = value => setAorEdit(value)
   
    const handleViewClick = () => history.push('/menus/view');
    return (
        <div className="mt-5 menu-home-main-container">
            {
                menuFetch.loading && <LoadingSpinner alignment="centered" variant="primary">Loading</LoadingSpinner>
            }
            {
                menuFetch.success && !menuFetch.loading &&
                <React.Fragment>
                    <HomeCurrentSelection menus={menuList} />
                    <AddOrRemoveMenuSelection aorEdit={aorEdit} click={handleAorClick} />
                    <Paper className="menu-home-main-paper" onClick={handleViewClick} style={{backgroundColor: "#ff7043"}}>
                        <Button variant="outline-light" size="lg" className="w-50">View or Edit Menus</Button>
                    </Paper>
                </React.Fragment>
            }
            {
                menuFetch.error && !menuFetch.loading &&
                <Alert variant="danger" className="m-2 text-center">{menuFetch.error}</Alert>
            }
        </div>
    )
}

export default MenuHomePage;
