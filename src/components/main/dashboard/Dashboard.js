import React, {useEffect} from 'react';
import { getAllOrders } from '../../../redux/orders/orderActions';
import { connect } from 'react-redux';
import LoadingSpinner from '../../utility/LoadingSpinner';
import RevenueChart from './RevenueChart';

const Dashboard = ({orderData, retrieveUsers}) => {

     useEffect(() => {
        retrieveUsers();
    }, [retrieveUsers]);

    const renderRevenueDataChart = () => {
        let revenueData = {};
        for (let order of orderData.data) {
            if (revenueData.hasOwnProperty(order.date)){
                revenueData[order.date] += order.totalCost
            } else {
                revenueData[order.date] = order.totalCost
            }
        }
        let structureDataForChart = [];
        for (const [key, value] of Object.entries(revenueData)) {
            structureDataForChart.push({date: key, totalCost: value})
        }
        return <RevenueChart data={structureDataForChart} />;
    }

    return (
        <React.Fragment>
            {
            orderData &&
                <div className="mt-5">
                    {orderData.loading && <LoadingSpinner alignment="center">Loading Dash...</LoadingSpinner>}
                    {(!orderData.loading && orderData.data) && renderRevenueDataChart() }
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
