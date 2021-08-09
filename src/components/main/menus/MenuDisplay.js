import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import { MAIN_MENU } from '../../../constants/constants';
import MenuHeader from './MenuHeader'
import MenuSection from './MenuSection';

const MenuDisplay = ({menu}) => {
    const context = useSelector(state => state.menus.context);
    
    return (
        <React.Fragment>
            <MenuHeader title={context.title} subheader={context.message} menuType={MAIN_MENU} updateKey={menu.id} fontSize="3.25rem" fontWeight="500" />
            <div className="separator"></div>
            { 
                !menu.menus || menu.menus.length === 0 ? 
                <Alert variant="warning" style={{width: "30%"}}>Create menus to see them here.</Alert>
                : menu.menus.map((m, i) => <MenuSection key={i} subMenu={m} sectionIndex={i} updateId={menu.id}/>)
            }
        </React.Fragment>
    )
}

export default MenuDisplay;
