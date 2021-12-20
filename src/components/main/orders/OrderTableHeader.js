import React from 'react'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableHeaderCell from '../../utility/TableHeaderCell';

const OrderTableHeader = ({cols, handleClick, active}) => {
    return (
        <TableHead>
            <TableRow>
                <TableHeaderCell name={cols[0].name} isSortable={cols[0].sortable} indx={0} isActive={active} align="text-left" handleClick={handleClick} />
                <TableHeaderCell name={cols[1].name} isSortable={cols[1].sortable} indx={1} isActive={active} align="text-left" handleClick={handleClick} />
                <TableHeaderCell name={cols[2].name} isSortable={cols[2].sortable} indx={2} isActive={active} align="text-left" handleClick={handleClick} />
                <TableHeaderCell name={cols[3].name} isSortable={cols[3].sortable} indx={3} isActive={active} align="text-left" handleClick={handleClick} />
                <TableHeaderCell name={cols[4].name} isSortable={cols[4].sortable} indx={4} isActive={active} align="text-end" handleClick={handleClick} />
                <TableHeaderCell name={cols[5].name} isSortable={cols[5].sortable} indx={5} isActive={active} align="text-end" handleClick={handleClick} />
                <TableHeaderCell name={cols[6].name} isSortable={cols[6].sortable} indx={6} isActive={active} align="text-center" handleClick={handleClick} />
            </TableRow>
        </TableHead>
    )
}

export default OrderTableHeader
