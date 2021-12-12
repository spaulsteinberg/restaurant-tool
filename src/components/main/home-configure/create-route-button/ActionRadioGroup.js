import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const ActionRadioGroup = ({ value, handleChange, addValue, editValue }) => {
    return (
        <RadioGroup name="menus" aria-label="by-menu" value={value} onChange={handleChange}>
            <FormControlLabel value={addValue} control={<Radio />} label={"Add"} />
            <FormControlLabel value={editValue} control={<Radio />} label={"Edit"} />
        </RadioGroup>
    )
}


export default ActionRadioGroup