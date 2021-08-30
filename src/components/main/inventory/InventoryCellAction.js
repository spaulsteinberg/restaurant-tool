import React from 'react';
import TableCell from '@material-ui/core/TableCell'
import SaveDiscardButtons from '../../utility/SaveDiscardButtons';
import InputBox from '../../utility/InputBox';
import ProgressBar from '../../utility/ProgressBar';

const InventoryCellAction = ({ handleSave, handleDiscard, wideView, handleInputChange, values, error, loading }) => {
    return (
        <React.Fragment>
            {
                !loading ?
                    <React.Fragment>
                        <TableCell width="30%">
                            <InputBox className="inventory-editable-row-in" value={values.count} name="count" onChange={handleInputChange} />
                        </TableCell>
                        <TableCell width="25%">
                            <InputBox className="inventory-editable-row-in" value={values.cost} name="cost" onChange={handleInputChange} />
                        </TableCell>
                        <TableCell align="right" width="20%">
                            <SaveDiscardButtons
                                saveChange={handleSave}
                                discardChange={handleDiscard}
                                marginCancel={wideView ? "mx-2" : ""}
                                marginSave={wideView ? "" : "mb-1"}
                                classes="inventory-table-buttons" />
                            {error && <small className="text-danger">{error}</small>}
                        </TableCell>
                    </React.Fragment>
                    : 
                    <TableCell colSpan={3} className="text-center">
                        <ProgressBar color="primary" className="w-75" />
                    </TableCell>
            }
        </React.Fragment>
    )
}

export default InventoryCellAction
