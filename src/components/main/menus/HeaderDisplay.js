import React from 'react';
import PropTypes from 'prop-types';
import EditIconButton from '../../utility/EditIconButton'
import RemoveItemButton from '../../utility/RemoveItemButton';
import { MAIN_MENU } from '../../../constants/constants';

const HeaderDisplay = ({title, subheader, menuType, fontSize, fontWeight, onEditClick, onDeleteClick, icon}) => {
    return (
        <React.Fragment>
            <h1 style={{ fontSize: fontSize, fontWeight: fontWeight }}>{title}</h1>
            <p style={{ fontSize: `calc(${fontSize} / 1.8)` }}>{subheader}</p>
            <EditIconButton variant="info" onClick={onEditClick} text={menuType !== MAIN_MENU ? null : "Edit"} textColor="white" icon={icon} />
            { menuType !== MAIN_MENU && <RemoveItemButton className="mx-2" onClick={onDeleteClick} /> }
        </React.Fragment>
    )
}

HeaderDisplay.propTypes = {
    click: PropTypes.func,
    icon: PropTypes.element
}

export default HeaderDisplay
