import React from 'react';
import EditIconButton from '../../utility/EditIconButton'
import RemoveItemButton from '../../utility/RemoveItemButton'
import { pencilOutlineSmallFull, trashSmallIcon } from '../../../constants/svg/svgs'
import TableCell from '@material-ui/core/TableCell'

const InventoryCellDisplay = ({item, editClick, removeClick, wideView}) => {
    return (
        <React.Fragment>
            <TableCell align="center" width="30%">{item.count}</TableCell>
            <TableCell align="right" width="25%">${item.cost.toFixed(2)}</TableCell>
            <TableCell align="right" width="20%">
                <div className="inventory-table-buttons">
                    <EditIconButton text={null} icon={pencilOutlineSmallFull} onClick={editClick} />
                    <RemoveItemButton icon={trashSmallIcon} className={wideView ? "mx-2" : "mt-1"} onClick={removeClick} />
                </div>
            </TableCell>
        </React.Fragment>
    )
}

export default InventoryCellDisplay
