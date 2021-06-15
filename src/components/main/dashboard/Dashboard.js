import React, {useEffect} from 'react';
import { getAllOrders } from '../../../redux/orders/orderActions';
import { connect } from 'react-redux';
import LoadingSpinner from '../../utility/LoadingSpinner';
import RevenueChart from './RevenueChart';
import TopBar from './TopBar';

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
            structureDataForChart.push({date: key, Revenue: value})
        }
        return <RevenueChart data={structureDataForChart} />;
    }

    const sumOrderCostForRevenue = () => orderData.data.map(order => order.totalCost).reduce((acc, cur) => acc += cur)

    const averageOrderPrice = () => sumOrderCostForRevenue() / orderData.data.length

    return (
        <React.Fragment>
            {
            orderData &&
                <div className="mt-5">
                    {orderData.loading && <LoadingSpinner alignment="center">Loading Dash...</LoadingSpinner>}
                    {(!orderData.loading && orderData.data) && 
                    <React.Fragment>
                        <TopBar numOrders={orderData.data.length} sumRevenue={sumOrderCostForRevenue} avgOrderPrice={averageOrderPrice}/>
                        {renderRevenueDataChart()}
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
