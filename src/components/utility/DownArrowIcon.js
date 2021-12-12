import React from 'react'
import { doubleDownArrow } from '../../constants/svg/svgs'

const DownArrowIcon = ({height, width, fill}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} fill={fill} viewBox="0 0 16 16">
            {doubleDownArrow.map(path => <path fillRule="evenodd" key={path} d={path} />)}
        </svg>
    )
}

export default DownArrowIcon
