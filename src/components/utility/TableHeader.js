import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

const TableHeader = ({columnNames, click, active}) => {
    return (
        <>
            {columnNames.map((name, i) => <TableCell key={name} className={active === i ? "table-header table-active-column" : "table-header"} onClick={click}>{name}</TableCell>)}
        </>
    )
}

TableHeader.propTypes = {
    columnNames: PropTypes.arrayOf(PropTypes.string),
    click: PropTypes.func,
    active: PropTypes.number
}

export default TableHeader;
