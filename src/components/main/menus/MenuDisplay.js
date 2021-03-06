import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import { MAIN_MENU } from '../../../constants/constants';
import AddMenuSection from './AddMenuSection';
import MenuHeader from './MenuHeader'
import MenuSection from './MenuSection';

const MenuDisplay = ({menu, menus, editable}) => {
    const context = useSelector(state => state.menus?.context);
    const menuNames = menu?.menus?.map(menu => menu.menuName)
    const isCurrent = useSelector(state => state.menus?.current?.name === context?.title)
    const menuListIndex = menus.findIndex(m => m.name === context.title)
    
    return (
        <React.Fragment>
            <MenuHeader 
                title={context.title}
                subheader={context.message}
                menuType={MAIN_MENU}
                updateKey={menu.id}
                fontSize="3.25rem"
                fontWeight="500"
                menuList={menus}
                index={menuListIndex}
                editable={editable}
                />
            <div className="separator"></div>
            { 
                !menu.menus || menu.menus.length === 0 ? 
                <Alert variant="warning" style={{width: "30%"}}>Create menus to see them here.</Alert>
                : menu.menus.map((m, i) => <MenuSection key={m.menuName + i} subMenu={m} sectionIndex={i} updateId={menu.id} isCurrent={isCurrent} menuList={menus} index={menuListIndex} editable={editable}/>)
            }
            {editable ? <AddMenuSection updateKey={menu.id} menuNames={menuNames} isCurrent={isCurrent} /> : null }
        </React.Fragment>
    )
}

export default MenuDisplay;
