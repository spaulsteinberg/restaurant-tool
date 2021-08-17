import React, {useState} from 'react';
import { Paper } from '@material-ui/core';
import SetCurrentMenuForm from './SetCurrentMenuForm';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentMenu } from '../../../api';
import { updateCurrentMenuTag } from '../../../redux/menus/menuActions';
import { Alert } from 'react-bootstrap';
import LoadingSpinner from '../../utility/LoadingSpinner';

const HomeCurrentSelection = ({menus}) => {
    const dispatch = useDispatch();
    const current = useSelector(state => state.menus.current);
    const menuNames = useSelector(state => state.menus.menuList.map(menu => menu.name));

    const emptyState = {error: '', success: false, loading: false}

    const [currentEdit, setCurrentEdit] = useState(false);
    const [formState, setFormState] = useState(emptyState)

    const handleDiscardClick = event => {
        event.stopPropagation();
        setCurrentEdit(false);
    }

    const handleSaveClick = (event, value) => {
        event.stopPropagation();
        if (value === current.name) return setFormState({error: `${value} is already marked as current.`, success: null, loading: false})
        setFormState({error: null, success: null, loading: true})
        let newIndex;
        const newCurrent = menus.find((menu, i) => {
            if (menu.name === value){
                newIndex = i;
                return menu;
            }
            return null;
        })

        if (!newCurrent) {
            return setFormState({error: "Something went wrong. Please try again.", loading: false})
        }

        updateCurrentMenu(current?.id, newCurrent.id)
        .then(() => {
            const menuCopy = [...menus];
            const oldIndex = menuCopy.findIndex(menu => menu.id === current.id);
            setFormState({error: null, success: `Current menu changed to ${value}!`, loading: false})
            dispatch(updateCurrentMenuTag({nIndex: newIndex, oIndex: oldIndex}))
        })
        .catch(() => setFormState({error: 'Something went wrong sending request.', loading: false, success: null}))
    } 
    const handleCurrentClick = event => {
        event.stopPropagation();
        if (event.target.name === "name-g" || event.target.tagName === "SPAN") return;
        setCurrentEdit(prev => !prev)
    }


    return (
        <Paper
            className="menu-home-main-paper"
            onClick={handleCurrentClick}
            style={{
                backgroundColor: currentEdit ? "#fff" : "#0dcaf0",
                justifyContent: currentEdit ? "flex-start" : "center",
                opacity: currentEdit && !formState.loading && 1
            }}>
            {currentEdit 
                ? 
                <React.Fragment>
                    <SetCurrentMenuForm names={menuNames} current={current?.name} discard={handleDiscardClick} save={handleSaveClick} />
                    {formState.loading && <LoadingSpinner alignment="left">Loading...</LoadingSpinner>}
                    {formState.success && <Alert variant="primary" className="m-2 text-center">{formState.success}</Alert>}
                    {formState.error && <Alert variant="danger" className="m-2 text-center">{formState.error}</Alert>}
                </React.Fragment>
                : <Button variant="outline-light" size="lg" className="w-50" onClick={handleCurrentClick}>Change Current Menu</Button>
            }
        </Paper>
    )
}

export default HomeCurrentSelection;
