import React from 'react'
import { defaultDropDownText } from '../../../constants/constants'
import ControlledFormSelect from '../../utility/ControlledFormSelect'

const InventoryFilterCategory = ({handleFilterChange, categoryList, value}) => {
    const options = [defaultDropDownText, ...categoryList]
    return (
        <ControlledFormSelect options={options} method={0} onChange={handleFilterChange} value={value} />
    )
}

export default InventoryFilterCategory
