import React from 'react'
import InputBackgroundPhoto from './InputBackgroundPhoto';
import InputLinks from './InputLinks';
import InputMainDescription from './InputMainDescription';
import InputRestaurantName from './InputRestaurantName';

const InputConfigureView = ({data}) => {
    return (
        <React.Fragment>
            <InputBackgroundPhoto photo={data.bpAddress} />
            <div className="home-input-container my-3">
                <InputRestaurantName restName={data.name} />
                <InputMainDescription restDescription={data.description}/>
                <InputLinks links={data.links} />
            </div>
        </React.Fragment>
    )
}

export default InputConfigureView
