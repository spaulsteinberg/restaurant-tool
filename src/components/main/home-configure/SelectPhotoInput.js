import { Tooltip } from '@material-ui/core';
import React from 'react'
import SelectPhotoButton from './SelectPhotoButton';

const SelectPhotoInput = ({fileInputRef, imageIsUploading, handleButtonUploadClick, handleInputChange, mobileView, tabletView, wideView}) => {
    return (
        <React.Fragment>
            <input type='file' hidden onChange={handleInputChange} ref={fileInputRef}/>
            <Tooltip title="Click to choose a home screen button" placement='top' arrow>
                <SelectPhotoButton 
                    onClick={handleButtonUploadClick} 
                    disabled={imageIsUploading} 
                    width={wideView ? 100 : tabletView ? 80 : mobileView ? 50 : 25} 
                    height={wideView ? 100 : tabletView ? 80: mobileView ? 50 : 25} />
            </Tooltip>
        </React.Fragment>
    )
}

export default SelectPhotoInput
