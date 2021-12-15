import React from 'react'
import InputBackground from './InputBackground';
import InputLinks from './InputLinks';
import InputMainDescription from './InputMainDescription';

const InputConfigureView = ({data}) => {
    return (
        <React.Fragment>
            <InputBackground photo={data.bpAddress} routeButtons={data.gotos} restNameData={data.name}/>
            <div className="home-input-container my-3">
                <InputMainDescription restDescription={data.description}/>
                <InputLinks links={data.links} />
            </div>
        </React.Fragment>
    )
}

export default InputConfigureView
