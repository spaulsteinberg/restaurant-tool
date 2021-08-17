import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { useState } from 'react'
import SaveDiscardButtons from '../../utility/SaveDiscardButtons'

const SetCurrentMenuForm = ({names, current, discard, save}) => {

    const [value, setValue] = useState(current)

    const handleChange = event => {
        event.stopPropagation();
        setValue(event.target.value)
    }
    
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">
                <RadioGroup name="menus" aria-label="by-menu" value={value} onChange={handleChange}>
                    {names.map(name => <FormControlLabel key={name} name="name-g" value={name} control={<Radio />} label={name} />)}
                </RadioGroup>
            </FormLabel>
            <SaveDiscardButtons discardChange={discard} saveChange={(e) => save(e, value)}/>
        </FormControl>
    )
}

export default SetCurrentMenuForm
