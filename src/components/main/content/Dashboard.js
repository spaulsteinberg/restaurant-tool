import React, {useEffect} from 'react';
import { getAllOrders } from '../../../redux/orders/orderActions';
import { connect } from 'react-redux';
import LoadingSpinner from '../../utility/LoadingSpinner';

const Dashboard = ({orderData, retrieveUsers}) => {
     useEffect(() => {
        retrieveUsers();
    }, [retrieveUsers])
    return (
        <React.Fragment>
            {
            orderData &&
                <div>
                    {orderData.loading && <LoadingSpinner alignment="center">Retrieving data...</LoadingSpinner>}
                    {(!orderData.loading && orderData.data) &&  orderData.data.map(order => <div key={order.lastName}>{order.firstName + " " + order.lastName}</div>)}
                    {orderData.error && <p className="text-danger">{orderData.error}</p>}
                </div>
            }
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        orderData: state.orders
    }
}
// map the dispatch function in props
const mapDispatchToProps = dispatch => {
    return {
        retrieveUsers: () => dispatch(getAllOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
