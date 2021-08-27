import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import SortableIcon from './SortableIcon';

const TableHeader = ({columnNames, click, active, ...rest}) => {
    return (
        <>
            {columnNames.map((column, i) => 
                <TableCell key={column.name} className={`${active === i ? "table-header table-active-column" : "table-header"} ${column.sortable && "sortable-table-header"}`} onClick={click} {...rest}>{column.name}
                        {column.sortable && 
                            <sup>
                                <SortableIcon direction={active === i ? 0 : 1} fill={active === i ? "#0d6efd" : "black"}/>
                            </sup>
                        }
                </TableCell>
            )}
        </>
    )
}

TableHeader.propTypes = {
    columnNames: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        sortable: PropTypes.bool
    })),
    click: PropTypes.func,
    active: PropTypes.number
}

export default TableHeader;
