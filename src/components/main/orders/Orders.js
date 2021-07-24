import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ORDER_TIMEFRAMES } from '../../../constants/constants';
import { getAllOrders } from '../../../redux/dashboard/orderActions';
import LoadingSpinner from '../../utility/LoadingSpinner';
import OrderTable from './OrderTable';
import SearchBar from './SearchBar';

const Orders = ({orders, getOrders}) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchDuration, setSearchDuration] = useState(ORDER_TIMEFRAMES.ONE_WEEK);

    const handleSearchChange = event => {
        const {value} = event.target;
        setSearchValue(value);
    }

    const handleDurationChange = event => {
        setSearchDuration(event.target.value);
    }

    useEffect(() => {
        getOrders(searchDuration);
    }, [getOrders, searchDuration])

    return (
        <React.Fragment>
            <div className="order-search-container">
                <SearchBar value={searchValue} searchChange={handleSearchChange} durationChange={handleDurationChange}/>
            </div>
            { orders.loading && <LoadingSpinner alignment="centered">Loading</LoadingSpinner>}
            { !orders.loading && orders.data && <OrderTable orders={orders.data} searchValue={searchValue}/>}
            { !orders.loading && orders.error && <Alert variant="danger">An error occurred. Please reload and try again.</Alert>}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (timeframe) => dispatch(getAllOrders(timeframe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
