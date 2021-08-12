import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { circleSlashForCancelPaths, pencilIconFull, saveIcon } from '../../../constants/svg/svgs'
import HeaderForm from './HeaderForm'
import HeaderDisplay from './HeaderDisplay'
import { MAIN_MENU } from '../../../constants/constants'
import { updateMainMenuTitleAndDescription, updateMenuItem } from '../../../api'
import ProgressBar from '../../utility/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import { editItemSuccess, editMainMenuSuccess, updateContext } from '../../../redux/menus/menuActions'

const MenuHeader = ({title, subheader, sectionIndex, menuType, updateKey, fontSize, fontWeight}) => {
    const context = useSelector(state => state.menus.context);
    const currentMenuNames = useSelector(state => state.menus.menuList.map(menu => menu.name))
    const index = useSelector(state => state.menus.menuList.findIndex(menu => menu.name === context.title))
    const subMenuNames = useSelector(state => state.menus.menuList[index]?.menus.map(m => m.menuName))
    const menus = useSelector(state => state.menus.menuList);
    const dispatch = useDispatch();

    const blankState = {name: '', optionalMessage: ''}

    const [headerRequestState, setHeaderRequestState] = useState({loading: false, error: ''})
    const [editing, setEditing] = useState(false);
    const [headerForm, setHeaderForm] = useState(blankState)

    const ref = useRef();

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick)
        }
        // have to disable this lint warning. Even in strict mode its useless.
        // eslint-disable-next-line
    }, [])

    const handleDocumentClick = e => {
        if (!ref || !ref.current) { return; }
        if (ref.current.contains(e.target) && !editing) {
            return;
        }
        if (!ref.current.contains(e.target) && e.target.innerText?.trim() !== "Edit") {
            setEditing(false)
            setHeaderForm(blankState)
        }
    }

    const validateMain = () => {
        if (!headerForm.name || headerForm.name.trim() === '') {
            setHeaderRequestState(prevState => { return { ...prevState, error: 'Menu name cannot be blank', loading: false } });
            return false;
        }
        if (currentMenuNames.includes(headerForm.name.trim()) && index !== currentMenuNames.findIndex(name => name === headerForm.name.trim())) {
            setHeaderRequestState(prevState => { return { ...prevState, error: 'Cannot have duplicate menu names', loading: false } });
            return false;
        }
        return true;
    }

    const validateSections = () => {
        if (!headerForm.name || !headerForm.name.trim()){
            setHeaderRequestState(prevState => { return { ...prevState, error: 'Section name cannot be blank', loading: false } })
            return false;
        }
        if (subMenuNames.includes(headerForm.name.trim()) && sectionIndex !== subMenuNames.findIndex(name => name.trim().toLowerCase() === headerForm.name.trim().toLowerCase())) {
            setHeaderRequestState(prevState => { return { ...prevState, error: 'Cannot have duplicate section names', loading: false } });
            return false;
        }
        return true;
    }

    const handleOnSaveClick = event => {
        event.preventDefault();
        setHeaderRequestState(prevState => { return {...prevState, loading: true, error: ''}})
        if (menuType === MAIN_MENU){
            if (validateMain()) {
                updateMainMenuTitleAndDescription(headerForm.name, headerForm.optionalMessage, updateKey)
                    .then(() => {
                        setEditing(false);
                        const menuCopy = [...menus];
                        menuCopy[index].name = headerForm.name;
                        menuCopy[index].optionalMessage = headerForm.optionalMessage;
                        if (menuCopy[index].current === true){
                            dispatch(editMainMenuSuccess({isCurrent: true, newMenu: menuCopy, currentMenu: menuCopy[index]}))
                        }
                        else {
                            dispatch(editMainMenuSuccess({isCurrent: false, newMenu: menuCopy}))
                        }
                        dispatch(updateContext({title: menuCopy[index].name, message: menuCopy[index].optionalMessage}))
                        setHeaderForm(blankState)
                    })
                    .catch(err => {
                        setHeaderRequestState(prevState => { return { ...prevState, error: 'Request failed. Please reload and try again.' } })
                        setEditing(false)
                    })
                    .finally(() => {
                        setHeaderRequestState(prevState => { return { ...prevState, loading: false } })
                    })
            } else return;
        }
        else {
            if (validateSections()){
                let menuCopy = [...menus].find(menu => menu.name === context.title);
                menuCopy.menus[sectionIndex].menuName = headerForm.name;
                menuCopy.menus[sectionIndex].optionalMessage = headerForm.optionalMessage
                updateMenuItem(menuCopy, updateKey)
                .then(() => {
                    dispatch(editItemSuccess({menu: menuCopy, index: index}))
                    setHeaderForm(blankState);
                    setHeaderRequestState(prevState => { return { ...prevState, loading: false } })
                    setEditing(false);
                })
                .catch(err => {
                    console.log("error", err)
                    setHeaderRequestState(prevState => { return { ...prevState, error: 'Request failed. Please reload and try again.', loading: false } })
                    setEditing(false);
                })
            }
            else return;
        } 
        
        // check for main or sub menu
        // if main just make the calls
        // if sub will need to get indexes
    }
    const handleOnDiscardClick = event => {
        event.preventDefault();
        setEditing(false)
        setHeaderRequestState({...headerRequestState, error: ''});
        setHeaderForm(blankState)
    }
    const handleInputChange = event => {
        let { name, value } = event.target;
        setHeaderForm({...headerForm, [name]: value})
    }

    const handlSetEditClick = () => setEditing(true);

    return (
        <div className="menu-main-header">
            {
                !editing 
                ? <HeaderDisplay 
                    title={title} 
                    subheader={subheader} 
                    click={handlSetEditClick} 
                    icon={pencilIconFull} 
                    fontSize={fontSize} 
                    fontWeight={fontWeight} />
                : <HeaderForm 
                    ref={ref}
                    form={headerForm}
                    handleInputChange={handleInputChange}
                    saveClick={handleOnSaveClick} 
                    discardClick={handleOnDiscardClick} 
                    saveIcon={saveIcon} 
                    discardIcon={circleSlashForCancelPaths} />
            }
            { headerRequestState.loading && editing && <ProgressBar className="menu-loading-container" color="primary" /> }
            { headerRequestState.error && editing && <small className="mt-2 text-danger">{headerRequestState.error}</small>}
        </div>
    )
}

MenuHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subheader: PropTypes.string,
}

MenuHeader.defaultProps = {
    fontSize: '3rem',
    fontWeight: 500
}

export default MenuHeader

