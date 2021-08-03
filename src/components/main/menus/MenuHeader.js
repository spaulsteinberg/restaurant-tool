import React from 'react'
import PropTypes from 'prop-types'

const MenuHeader = ({title, subheader, fontSize, fontWeight}) => {
    return (
        <div className="menu-main-header">
            <h1 style={{fontSize: fontSize, fontWeight: fontWeight}}>{title}</h1>
            <p style={{fontSize: `calc(${fontSize} / 1.8)`}}>{subheader}</p>
        </div>
    )
}

MenuHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subheader: PropTypes.string,
}

MenuHeader.defaultProps = {
    fontSize: '3rem',
    fontWeight: 500
}

export default MenuHeader

