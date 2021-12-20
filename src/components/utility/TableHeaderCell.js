import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import SortableIcon from './SortableIcon';

const TableHeaderCell = ({name, isSortable, indx, isActive, align, handleClick, addLeftPadding = false}) => {
    return (
        <TableCell className={`${isActive === indx ? "table-header table-active-column" : "table-header"} ${addLeftPadding ? "itable-header-cell" : ""} ${isSortable && "sortable-table-header"} ${align} `} onClick={handleClick}>
            {name}
            {isSortable &&
                <sup>
                    <SortableIcon direction={isActive === indx ? 0 : 1} fill={isActive === indx ? "#0d6efd" : "black"} />
                </sup>
            }
        </TableCell>
    )
}

TableHeaderCell.propTypes = {
    name: PropTypes.string.isRequired,
    isSortable: PropTypes.bool.isRequired,
    click: PropTypes.func,
    active: PropTypes.number
}

export default TableHeaderCell;
