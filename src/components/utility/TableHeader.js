import React from 'react';
import TableCell from '@material-ui/core/TableCell';

const TableHeader = ({columnNames, click, active}) => {
    return (
        <>
            {columnNames.map((name, i) => <TableCell key={name} className={active === i ? "table-header table-active-column" : "table-header"} onClick={click}>{name}</TableCell>)}
        </>
    )
}

export default TableHeader;
