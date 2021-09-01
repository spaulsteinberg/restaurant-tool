import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import useWideView from '../../../hooks/useWideView'
import InventoryAddItem from './InventoryAddItem'
import InventoryAddModal from './InventoryAddModal'
import InventoryFilterCategory from './InventoryFilterCategory'
import SearchInventory from './SearchInventory'


const InventoryTableActionBar = ({value, handleSearchChange}) => {

    const {wideView} = useWideView(500);
    const [show, setShow] = useState(false);
    const names = useSelector(state => state.inventory.inventory.names)

    const handleOpen = event => {
        event.preventDefault();
        setShow(true);
    }

    const returnView = () => {
        return (
            <>
                <div className="search-inventory-input">
                    <SearchInventory value={value} handleSearchChange={handleSearchChange} />
                </div>
                <div className="filter-inventory-container">
                    <InventoryFilterCategory />
                </div>
            </>
        )
    }
    return (
        <div className="search-inventory-input-container">
            {
                wideView ?
                    returnView()
                : 
                    <React.Fragment>
                        <div className="search-combined-filter-container">
                           {returnView()}
                        </div>
                    </React.Fragment>
            }
            <div className="add-inventory-item-container">
                <InventoryAddItem wideView={wideView} onClick={handleOpen}/>
            </div>
            <InventoryAddModal show={show} handleClose={() => setShow(false)} itemsPresent={names}/>
        </div>
    )
}

export default InventoryTableActionBar
