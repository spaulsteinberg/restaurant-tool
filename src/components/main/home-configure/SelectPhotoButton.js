import React, { forwardRef } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import UploadIcon from '../../utility/UploadIcon'

const SelectPhotoButton = forwardRef((props, ref) => (
    <Button {...props} ref={ref}>
        { props.disabled ? <Spinner animation="grow" variant="dark" /> : <UploadIcon width={props.width} height={props.height} /> }
    </Button>
))
export default SelectPhotoButton
