import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { updateHomePhoto } from '../../../api';
import { homeImageCollection } from '../../../constants/constants';
import { updateHomePhotoAct } from '../../../redux/home/homeActions';
import { uploadImageFile } from '../../../utils';
import SelectPhotoFeedback from './SelectPhotoFeedback';
import SelectPhotoInput from './SelectPhotoInput'

const InputBackgroundPhoto = ({photo}) => {
    const dispatch = useDispatch()
    const fileInputRef = useRef();
    const [uploadState, setUploadState] = useState({loading: false, success: null, error: null})

    const handleButtonUploadClick = () => {
        fileInputRef.current.click()
    }

    const handleInputChange = async (event) => {
        console.log("beginning upload...")
        setUploadState({loading: true, success: null, error: null})
        try {
            const address = await uploadImageFile(event.target.files[0].name, event.target.files[0], homeImageCollection)
            updateHomePhoto(address)
            .then(() => {
                console.log("updated photo")
                dispatch(updateHomePhotoAct(address))
                setUploadState({loading: false, success: 'Image uploaded successfully!', error: ''})
            })
            .catch(err => {
                console.log(err)
                setUploadState({loading: false, success: null, error: 'There was an error uploading your image. Please try again.'})
            })
        } catch (err){
            console.log(err)
            setUploadState({loading: true, success: null, error: 'There was an error uploading your image. Please try again.'})
        }
        console.log("end upload")
    }
    
    return (
        <div className="background-photo-input" style={{backgroundImage: `url(${photo})`}}>
            <SelectPhotoInput 
                fileInputRef={fileInputRef} 
                imageIsUploading={uploadState.loading} 
                handleButtonUploadClick={handleButtonUploadClick} 
                handleInputChange={handleInputChange} />
            <SelectPhotoFeedback loading={uploadState.loading} success={uploadState.success} error={uploadState.error} />
        </div>
    )
}

export default InputBackgroundPhoto
