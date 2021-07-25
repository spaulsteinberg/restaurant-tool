import PropTypes from 'prop-types';

export class TableColumnSortable {
    constructor(name, sortable) {
        this.name = name;
        this.sortable = sortable;
    }
}

TableColumnSortable.propTypes = {
    name: PropTypes.string,
    sortable: PropTypes.bool
}