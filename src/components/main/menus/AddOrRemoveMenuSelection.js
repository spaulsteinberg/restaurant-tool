import React from 'react';
import Button from 'react-bootstrap/Button';
import { Paper } from '@material-ui/core';

const AddOrRemoveMenuSelection = ({aorEdit, click}) => {
    return (
        <Paper className="menu-home-main-paper" onClick={click} style={{ backgroundColor: aorEdit ? "#fff" : "#f06292" }}>
            {
                aorEdit ? <p>form goes here</p>
                    : <Button variant="outline-light" size="lg" className="w-50">Add or Remove Menus</Button>
            }
        </Paper>
    )
}

export default AddOrRemoveMenuSelection
