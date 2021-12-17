import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell'
import InventoryCellDisplay from './InventoryCellDisplay';
import InventoryCellAction from './InventoryCellAction';
import { editInventoryItemReq, removeInventoryItemReq } from '../../../api/inventoryApi';
import { useDispatch } from 'react-redux';
import { editInventoryItem, removeInventoryItem } from '../../../redux/inventory/inventoryActions';
import useWideView from '../../../hooks/useWideView';


const InventoryTableRowCells = ({item}) => {

    const [edit, setEdit] = useState(false)
    const [editItemForm, setEditItemForm] = useState({count: '', cost: ''})
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {wideView} = useWideView(768);

    const handleEditClick = event => {
        event.preventDefault();
        setEdit(true);
    }

    const handleSaveClick = event => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const count = parseFloat(editItemForm.count);
            const cost = parseFloat(editItemForm.cost)
            if (!count || !cost){
                return setError("Cost or count is invalid.")
            } else if (isNaN(count)){
                return setError("Count must be a valid number.")
            } else if (isNaN(cost)){
                return setError("Cost must be a valid number.")
            } else {
                editInventoryItemReq(item.id, count, cost)
                    .then(res => {
                        let resultObj = {...item, count: count, cost: cost}
                        dispatch(editInventoryItem({id: item.consumable, data: resultObj}))
                        setLoading(false)
                        setEditItemForm({count: '', cost: ''})
                        setEdit(false)
                    })
                    .catch(err => {
                        setError("Request failed. Please try again.")
                        setLoading(false)
                    })
            }
        } catch (err) {
            return setError("Error processing input. Please validate it is correct and try again.")
        }
    }

    const handleCancelEditClick = event => {
        event.preventDefault();
        setEdit(false);
    }

    const handleRemoveClick = event => {
        event.preventDefault();
        setLoading(true);
        removeInventoryItemReq(item.id)
        .then(() => {
            dispatch(removeInventoryItem(item.consumable))
            setLoading(false)
        })
        .catch(() => { 
            setLoading(false);
            setError("Failed to delete item.")
        })
    }

    const handleInputChange = event => {
        let { name, value } = event.target;
        setEditItemForm({...editItemForm, [name]: value})
    }

    return (
        <React.Fragment>
            {
                item ?
                    <>
                        <TableCell component="th" scope="row" align="left" style={{ paddingLeft: "2rem" }} width="25%">{item.consumable}</TableCell>
                        {
                            !edit 
                            ? <InventoryCellDisplay item={item} editClick={handleEditClick} removeClick={handleRemoveClick} wideView={wideView} loading={loading}/>
                            : <InventoryCellAction 
                                    handleSave={handleSaveClick} 
                                    handleDiscard={handleCancelEditClick} 
                                    wideView={wideView} 
                                    handleInputChange={handleInputChange} 
                                    values={editItemForm} 
                                    error={error}
                                    loading={loading}
                                    />
                        }
                    </>
                : null
            }
        </React.Fragment>
    )
}

export default InventoryTableRowCells
