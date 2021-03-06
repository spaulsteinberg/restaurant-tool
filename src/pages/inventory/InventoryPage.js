import React, { useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllInventoryItems } from '../../redux/inventory/inventoryActions'
import LoadingSpinner from '../../components/utility/LoadingSpinner'
import InventoryTable from '../../components/main/inventory/InventoryTable'
import useRoles from '../../hooks/useRoles'

const InventoryPage = () => {

    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const roles = useRoles()
    
    useEffect(() => {
        dispatch(fetchAllInventoryItems())
    }, [dispatch])

    return (
        <React.Fragment>
            {
                inventory.loading ? <LoadingSpinner alignment="centered" variant="primary" marginTop="2rem">Loading Inventory</LoadingSpinner>
                : inventory.inventory ? <InventoryTable inventory={inventory.inventory} userHasWritePermissions={roles?.write || roles?.admin}/>
                : inventory.error ? <Alert variant="danger" className="mt-3 text-center">{inventory.error}</Alert>
                : null
            }
        </React.Fragment>
    )
}

export default InventoryPage
