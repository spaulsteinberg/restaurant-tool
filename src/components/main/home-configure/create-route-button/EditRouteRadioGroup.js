import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RouteButton from '../RouteButton';

const EditRouteRadioGroup = ({radioValue, handleChange, data}) => {
    return (
        <RadioGroup name="routes" className="mt-1" aria-label="by-route" value={radioValue} onChange={handleChange}>
            {
                data && data.length > 0 ?
                data.map(d => <FormControlLabel key={d.display} value={d.display} control={<Radio />} label={<RouteButton sm={false} btn={d} handleClick={() => {}}/>} /> )
                : <p>You dont have any route buttons to edit! Add some to view them here.</p>
            }
        </RadioGroup>
    )
}

export default EditRouteRadioGroup
