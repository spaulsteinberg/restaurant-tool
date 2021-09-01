import React from 'react'
import ControlledFormSelect from '../../utility/ControlledFormSelect'

const InventoryFilterCategory = () => {
    const options = ["placeholder 1", "placeholder 2", "placeholder 3"]
    return (
        <ControlledFormSelect options={options} method={0} />
    )
}

export default InventoryFilterCategory
