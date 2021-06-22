import React, { useEffect } from 'react';
import { getAllOrders } from '../../../redux/dashboard/orderActions';
import { connect } from 'react-redux';
import LoadingSpinner from '../../utility/LoadingSpinner';
import RevenueChart from './RevenueChart';
import TopBar from './TopBar';
import PopularityChart from './PopularityChart';
import MostPurchasedChart from './MostPurchasedChart';

const Dashboard = ({orderData, retrieveUsers}) => {

     useEffect(() => {
        retrieveUsers();
    }, [retrieveUsers]);

    const sumOrderCostForRevenue = () => orderData.data.length > 0 ? orderData.data.map(order => order.totalCost).reduce((acc, cur) => acc += cur) : 0

    const averageOrderPrice = () => orderData.data.length > 0 ? sumOrderCostForRevenue() / orderData.data.length : 0

    return (
        <React.Fragment>
            {
            orderData &&
                <div className="mt-5">
                    {orderData.loading && <LoadingSpinner alignment="center">Loading Dash...</LoadingSpinner>}
                    {(!orderData.loading && orderData.data) && 
                    <React.Fragment>
                        <TopBar numOrders={orderData.data.length} sumRevenue={sumOrderCostForRevenue} avgOrderPrice={averageOrderPrice}/>
                        <div className="dashboard-body">
                            <div className="dashboard-body-item">
                                <RevenueChart />
                            </div>
                            <div className="dashboard-body-item">
                                <PopularityChart />
                            </div>
                            <div className="dashboard-body-item">
                                <MostPurchasedChart />
                            </div>
                        </div>
                    </React.Fragment> }
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
