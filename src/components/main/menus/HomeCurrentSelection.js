import React, {useState} from 'react';
import SetCurrentMenuForm from './SetCurrentMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentMenu } from '../../../api/menuApi';
import { updateCurrentMenuTag } from '../../../redux/menus/menuActions';
import { Alert } from 'react-bootstrap';
import LoadingSpinner from '../../utility/LoadingSpinner';
import MenuSelectionItem from './MenuSelectionItem';
import MenuSelectionButton from './MenuSelectionButton';

const HomeCurrentSelection = ({menus}) => {
    const dispatch = useDispatch();
    const current = useSelector(state => state.menus.current);
    const menuNames = useSelector(state => state.menus.menuList.map(menu => menu.name));

    const emptyState = {error: '', success: false, loading: false}

    const [currentEdit, setCurrentEdit] = useState(false);
    const [formState, setFormState] = useState(emptyState)

    const handleDiscardClick = event => {
        event.stopPropagation();
        setFormState(emptyState);
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
        setFormState(emptyState);
        setCurrentEdit(prev => !prev)
    }


    return (
        <MenuSelectionItem className="menu-home-main-paper"
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
                    <div className="centered-item">
                        {formState.loading && <LoadingSpinner alignment="left">Loading...</LoadingSpinner>}
                        {formState.success && <Alert variant="primary" className="m-2 text-center">{formState.success}</Alert>}
                        {formState.error && <Alert variant="danger" className="m-2 text-center">{formState.error}</Alert>}
                    </div>
                </React.Fragment>
                : <MenuSelectionButton handleClick={handleCurrentClick} buttonText="Change Current Menu" />
            }
        </MenuSelectionItem>
    )
}

export default HomeCurrentSelection;
