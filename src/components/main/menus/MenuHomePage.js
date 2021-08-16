import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import { Paper } from '@material-ui/core'

const MenuHomePage = () => {
    const history = useHistory();
    const [currentEdit, setCurrentEdit] = useState(false);
    const [aorEdit, setAorEdit] = useState(false);

    const handleAorClick = () => setAorEdit(true)
    const handleCurrentClick = () => setCurrentEdit(true)
    const handleViewClick = () => history.push('/menus/view');
    return (
        <div className="mt-5 menu-home-main-container">
            <Paper className="menu-home-main-paper" onClick={handleCurrentClick} style={{backgroundColor: currentEdit ? "#fff" : "#0dcaf0"}}>
                { currentEdit ? <p>form goes here</p>
                  : <Button variant="outline-light" size="lg" className="w-50">Change Current Menu</Button>
                }
            </Paper>
            <Paper className="menu-home-main-paper" onClick={handleAorClick} style={{backgroundColor: aorEdit ? "#fff" : "#f06292"}}>
                {
                    aorEdit ? <p>form goes here</p>
                    : <Button variant="outline-light" size="lg" className="w-50">Add or Remove Menus</Button>
                }
            </Paper>
            <Paper className="menu-home-main-paper" onClick={handleViewClick} style={{backgroundColor: "#ff7043"}}>
                <Button variant="outline-light" size="lg" className="w-50">View or Edit Menus</Button>
            </Paper>
        </div>
    )
}

export default MenuHomePage;
