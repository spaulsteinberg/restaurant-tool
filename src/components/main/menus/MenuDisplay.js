import React from 'react'
import Alert from 'react-bootstrap/Alert';
import MenuHeader from './MenuHeader'
import MenuSection from './MenuSection';

const MenuDisplay = ({menu}) => {
    
    return (
        <React.Fragment>
            <MenuHeader title={menu.name} subheader={menu.optionalMessage} fontSize="3.25rem" fontWeight="500" />
            <div className="separator"></div>
            { 
                !menu.menus || menu.menus.length === 0 ? 
                <Alert variant="warning" style={{width: "30%"}}>Create menus to see them here.</Alert>
                : menu.menus.map((m, i) => <MenuSection key={i} subMenu={m} sectionIndex={i} mainMenuName={menu.name} updateId={menu.id}/>)
            }
        </React.Fragment>
    )
}

export default MenuDisplay;
