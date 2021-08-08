import React from 'react';
import PropTypes from 'prop-types';
import EditIconButton from '../../utility/EditIconButton'

const HeaderDisplay = ({title, subheader, fontSize, fontWeight, click, icon}) => {
    return (
        <React.Fragment>
            <h1 style={{ fontSize: fontSize, fontWeight: fontWeight }}>{title}</h1>
            <p style={{ fontSize: `calc(${fontSize} / 1.8)` }}>{subheader}</p>
            <EditIconButton variant="info" onClick={click} text="Edit" icon={icon} />
        </React.Fragment>
    )
}

HeaderDisplay.propTypes = {
    click: PropTypes.func,
    icon: PropTypes.element
}

export default HeaderDisplay
