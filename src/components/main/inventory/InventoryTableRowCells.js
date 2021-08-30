import React, { useState, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell'
import InventoryCellDisplay from './InventoryCellDisplay';
import InventoryCellAction from './InventoryCellAction';
import { editInventoryItemReq } from '../../../api';


const InventoryTableRowCells = ({item}) => {

    const [edit, setEdit] = useState(false)
    const [wideView, setWideView] = useState(false)
    const [editItemForm, setEditItemForm] = useState({count: '', cost: ''})
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
                        console.log("success", res)
                        setLoading(false)
                        setEdit(false)
                    })
                    .catch(err => {
                        console.log(err)
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
        console.log("remove click")
    }

    const handleInputChange = event => {
        let { name, value } = event.target;
        setEditItemForm({...editItemForm, [name]: value})
    }

    useEffect(() => {

        if (window.matchMedia("(min-width: 768px)").matches) {
            setWideView(true)
        }

        let widthCheck = window.matchMedia("(min-width: 768px)")
        widthCheck.addEventListener("change", shouldChangeInputAlignment, true);
        return () => {
            widthCheck.removeEventListener("change", shouldChangeInputAlignment, true)
          }
    }, [])

    const shouldChangeInputAlignment = e => e.matches ? setWideView(true) : setWideView(false)

    return (
        <React.Fragment>
            <TableCell component="th" scope="row" align="left" style={{ paddingLeft: "2rem" }} width="25%">{item.consumable}</TableCell>
            {
                !edit 
                ? <InventoryCellDisplay item={item} editClick={handleEditClick} removeClick={handleRemoveClick} wideView={wideView} />
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
        </React.Fragment>
    )
}

export default InventoryTableRowCells
