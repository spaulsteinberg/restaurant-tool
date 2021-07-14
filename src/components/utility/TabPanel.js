import React from 'react';

// tab panel for material ui tabs - taken directly from docs
const TabPanel = props => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        style={{marginTop: '1rem'}}
        {...other}
      >
        {value === index && (
          <div>{children}</div>
        )}
      </div>
    );
}

export default TabPanel;