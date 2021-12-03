import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllMenus } from '../../redux/menus/menuActions'
import LoadingSpinner from '../../components/utility/LoadingSpinner'
import { Alert } from 'react-bootstrap'
import HomeCurrentSelection from '../../components/main/menus/HomeCurrentSelection'
import AddOrRemoveMenuSelection from '../../components/main/menus/AddOrRemoveMenuSelection'
import ViewEditMenuSelection from '../../components/main/menus/ViewEditMenuSelection'
import ConfigureHomeSelection from '../../components/main/menus/ConfigureHomeSelection'
import useRoles from '../../hooks/useRoles'

const MenuHomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const roles = useRoles()
    const menuFetch = useSelector(state => state.menus.get);
    const menuList = useSelector(state => [...state.menus?.menuList]);
    const current = useSelector(state => state.menus.current)

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
                    <AddOrRemoveMenuSelection menus={menuList} current={current}/>
                    <ViewEditMenuSelection handleViewClick={handleViewClick} />
                    { roles?.admin ? <ConfigureHomeSelection /> : null }
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
