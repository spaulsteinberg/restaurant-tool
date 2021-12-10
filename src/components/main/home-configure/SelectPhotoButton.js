import React, { forwardRef } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import UploadIcon from '../../utility/UploadIcon'

const SelectPhotoButton = forwardRef((props, ref) => (
    <Button {...props} ref={ref}>
        { props.disabled ? <Spinner animation="grow" variant="dark" /> : <UploadIcon width={100} height={100} />}
    </Button>
))
export default SelectPhotoButton
