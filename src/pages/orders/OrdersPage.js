import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ORDER_TIMEFRAMES } from '../../constants/constants';
import { getAllOrders } from '../../redux/orders/orderActions';
import LoadingSpinner from '../../components/utility/LoadingSpinner';
import OrderRefreshButton from '../../components/main/orders/OrderRefreshButton';
import OrderTable from '../../components/main/orders/OrderTable';
import SearchBar from '../../components/main/orders/SearchBar';

const OrdersPage = ({orders, getOrders}) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchDuration, setSearchDuration] = useState(ORDER_TIMEFRAMES.ONE_WEEK);

    const handleSearchChange = event => {
        const {value} = event.target;
        setSearchValue(value);
    }

    const handleDurationChange = event => {
        setSearchDuration(event.target.value);
    }

    const handleRefreshClick = () => getOrders(searchDuration)

    useEffect(() => {
        getOrders(searchDuration);
    }, [getOrders, searchDuration])

    return (
        <React.Fragment>
            <div className="order-search-container">
                <SearchBar value={searchValue} searchChange={handleSearchChange} durationChange={handleDurationChange}/>
            </div>
            { orders.loading && <LoadingSpinner alignment="centered">Loading</LoadingSpinner>}
            { !orders.loading && orders.data && (
                <React.Fragment>
                    <OrderTable orders={orders.data} searchValue={searchValue}/>
                    <OrderRefreshButton click={handleRefreshClick} />
                </React.Fragment>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
