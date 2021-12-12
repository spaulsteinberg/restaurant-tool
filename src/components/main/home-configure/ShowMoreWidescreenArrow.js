import React from 'react'
import { Button } from 'react-bootstrap'
import DownArrowIcon from '../../utility/DownArrowIcon'

const ShowMoreWidescreenArrow = ({handleDownscrollClick}) => {
    return (
        <div className='widescreen-button-container'>
            <Button variant="light" className="pulsating-button" onClick={handleDownscrollClick}>
                <DownArrowIcon width={16} height={16} fill="black" />
            </Button>
        </div>
    )
}

export default ShowMoreWidescreenArrow
