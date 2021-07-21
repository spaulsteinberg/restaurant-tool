import React, { useCallback, useEffect } from 'react';
import { getAllOrders } from '../../../redux/dashboard/orderActions';
import { connect } from 'react-redux';
import LoadingSpinner from '../../utility/LoadingSpinner';
import RevenueChart from './charts/RevenueChart';
import TopBar from './TopBar';
import PopularityChart from './charts/PopularityChart';
import MPFood from './charts/MPFood';
import MPBeverages from './charts/MPBeverages';
import MPFoodCategories from './charts/MPFoodCategories';
import MPBevCategories from './charts/MPBevCategories';
import RecentOrderTable from './RecentOrderTable';
import GoalProgressVisual from './GoalProgressVisual';
import { retrieveGoals } from '../../../redux/goals/goalActions';
import { useAuth } from '../../../contexts/AuthContext';
import { Alert } from 'react-bootstrap';
import { ORDER_TIMEFRAMES } from '../../../constants/constants';

const Dashboard = ({orderData, goals, retrieveUsers, loadGoals}) => {

    const {currentUser} = useAuth();

    const loadCurrentGoals = useCallback(() => loadGoals(currentUser.email), [currentUser.email, loadGoals])

    const numOrders = useCallback(() => orderData.data.length, [orderData.data])

    useEffect(() => {
        retrieveUsers();
        loadCurrentGoals();
    }, [retrieveUsers, loadCurrentGoals]);

    const sumOrderCostForRevenue = () => orderData.data.length > 0 ? orderData.data.map(order => order.totalCost).reduce((acc, cur) => acc += cur) : 0

    const averageOrderPrice = () => orderData.data.length > 0 ? sumOrderCostForRevenue() / orderData.data.length : 0;

    const topRowComponents = [ <RevenueChart tf={ORDER_TIMEFRAMES.ONE_WEEK}/>, <PopularityChart tf={ORDER_TIMEFRAMES.ONE_WEEK}/>, <MPFood /> ]
    const middleTableComponents = [ <MPBeverages />, <RecentOrderTable />]
    const bottomRowcomponentsToRender = [<MPFoodCategories />, <MPBevCategories />]
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
                            {topRowComponents.map((component, i) => <div className="dashboard-body-item" key={i}>{component}</div>)}
                            {middleTableComponents.map((component, i) => <div className={i === 1 ? "dashboard-body-table" : "dashboard-table-side-item"} key={i+4}>{component} </div>)}
                            {goals.get.loading ? 
                                <LoadingSpinner alignment="center">Retrieving Goals...</LoadingSpinner> :
                                goals.get.error ? <Alert variant="danger" className="text-center mt-2">Could not load goals.</Alert>
                                : <div className="dashboard-body-item goals-dashboard-element"><GoalProgressVisual goals={goals.goalsList} numOrders={numOrders} sumRevenue={sumOrderCostForRevenue}/></div>
                            }
                            {bottomRowcomponentsToRender.map((component, i) => <div className="dashboard-body-item bottom-row-item" key={i+10}>{component}</div>)}
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
        orderData: state.orders,
        goals: state.goals
    }
}
// map the dispatch function in props
const mapDispatchToProps = dispatch => {
    return {
        retrieveUsers: () => dispatch(getAllOrders(ORDER_TIMEFRAMES.ONE_WEEK)),
        loadGoals: (email) => dispatch(retrieveGoals(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
