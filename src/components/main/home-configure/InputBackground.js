import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { updateHomePhoto } from '../../../api';
import { homeImageCollection } from '../../../constants/constants';
import { updateHomePhotoAct } from '../../../redux/home/homeActions';
import { uploadImageFile } from '../../../utils';
import SelectPhotoFeedback from './SelectPhotoFeedback';
import SelectPhotoInput from './SelectPhotoInput'
import useWideView from '../../../hooks/useWideView';
import HomeRouteButtons from './HomeRouteButtons';
import OpenModalPrompt from './create-route-button/OpenModalPrompt';
import ShowMoreWidescreenArrow from './ShowMoreWidescreenArrow';

const InputBackground = ({photo, routeButtons}) => {
    const dispatch = useDispatch()
    const fileInputRef = useRef();
    const [uploadState, setUploadState] = useState({loading: false, success: null, error: null})
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const mobileView = useWideView(500).wideView;
    const tabletView = useWideView(768).wideView;
    const wideView = useWideView(992).wideView;

    const handleButtonUploadClick = () => {
        fileInputRef.current.click()
    }

    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)

    const handleCloseModal = event => {
    //    event.preventDefault();
        setShowModal(false)
    }

    const handleInputChange = async (event) => {
        console.log("beginning upload...")
        const file = event?.target?.files[0];
        if (!file) return
        if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)){
            setUploadState({loading: false, success: null, error: 'Image must be in .jpg, .jpeg, .png, or .gif format.'})
            return setSnackbarOpen(true)
        }

        setUploadState({loading: true, success: null, error: null})
        setSnackbarOpen(true)
        try {
            const address = await uploadImageFile(file.name, file, homeImageCollection)
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
            setSnackbarOpen(true)
        }
        console.log("end upload")
    }

    const handleDownscrollClick = () => window.scrollBy(0, 300)

    const handleClose = () => setSnackbarOpen(false)
    
    return (
        <div className="background-photo-input" style={{backgroundImage: `url(${photo})`}}>
            <SelectPhotoInput 
                fileInputRef={fileInputRef} 
                imageIsUploading={uploadState.loading} 
                handleButtonUploadClick={handleButtonUploadClick} 
                handleInputChange={handleInputChange}
                mobileView={mobileView}
                tabletView={tabletView}
                wideView={wideView} />
            <HomeRouteButtons 
                routeButtons={routeButtons} 
                sm={!mobileView} 
                showModal={showModal}
                handleShowModal={handleShowModal}
                handleClose={handleCloseModal}/>
            <OpenModalPrompt handleShowModal={handleShowModal} />
            { mobileView ? <ShowMoreWidescreenArrow handleDownscrollClick={handleDownscrollClick} /> : null }
            <SelectPhotoFeedback open={snackbarOpen} success={uploadState.success} error={uploadState.error} handleClose={handleClose} />
        </div>
    )
}

export default InputBackground
