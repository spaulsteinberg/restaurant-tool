import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TopBarIconShortcut from './TopBarIconShortcut';
import { cashCoinIconPaths, cartIconPath, tagIconPath, refreshIconPath } from '../../../constants/svg/svgs';
import {Link} from 'react-router-dom';
import { getAllOrders } from '../../../redux/dashboard/orderActions';
import { useDispatch } from 'react-redux';

const TopBar = (props) => {
    const dispatch = useDispatch();
    let iconData = [
        {
            element: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d={cashCoinIconPaths[0]} />
                        <path d={cashCoinIconPaths[1]} />
                        <path d={cashCoinIconPaths[2]} />
                        <path d={cashCoinIconPaths[3]} />
                    </svg>),
            title: "Revenue",
            data: `$${props.sumRevenue().toFixed(2)}`,
            timeframe: "Last Week"
        },
        {
            element: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" viewBox="0 0 16 16">
                        <path d={cartIconPath}/>
                    </svg>),
            title: "Orders",
            data: props.numOrders,
            timeframe: "Last Week"
        },
        {
            element: ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="orange" viewBox="0 0 16 16">
                <path d={tagIconPath[0]}/>
                <path d={tagIconPath[1]}/>
                </svg>
            ),
            title: "Avg Sale",
            data: `$${props.avgOrderPrice().toFixed(2)}`,
            timeframe: "Last Week"
        }
    ];

    const handleRefreshClick = event => {
        event.preventDefault();
        dispatch(getAllOrders())
    }
    return (
        <Card className="mt-3">
            <Card.Header className="dashboard-top-container">
                <div className="empty-div"></div>
                <div className="dashboard-top-header-container">
                    <h2 className="profile-header mb-2">Recent Activity</h2>
                </div>
                <div className="dashboard-top-refresh-container">
                    <button type="button" className="btn btn-secondary" id="refresh-dashboard-button" onClick={handleRefreshClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightblue" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d={refreshIconPath[0]} />
                            <path d={refreshIconPath[1]} />
                        </svg>
                    </button>
                </div>
            </Card.Header>
            <Card.Body className="top-nav-body-wrapper">
                {iconData.map((icon, ind) => <TopBarIconShortcut iconData={icon} key={ind} />)}
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" as={Link} to="/orders">View More in Orders</Button>
            </Card.Footer>
        </Card>
    )
}

export default TopBar
