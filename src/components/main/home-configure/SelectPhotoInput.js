import { Tooltip } from '@material-ui/core';
import React from 'react'
import SelectPhotoButton from './SelectPhotoButton';

const SelectPhotoInput = ({fileInputRef, imageIsUploading, handleButtonUploadClick, handleInputChange}) => {

    return (
        <React.Fragment>
            <input multiple={false} type='file' hidden onChange={handleInputChange} ref={fileInputRef} />
            <Tooltip title="Click to choose a home screen button" placement='top' arrow>
                <SelectPhotoButton onClick={handleButtonUploadClick} disabled={imageIsUploading} />
            </Tooltip>
        </React.Fragment>
    )
}

export default SelectPhotoInput
