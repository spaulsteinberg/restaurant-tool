import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TopBarIconShortcut from './TopBarIconShortcut';
import { cashCoinIconPaths, cartIconPath, tagIconPath } from '../../../constants/svg/svgs';


const TopBar = (props) => {
    let iconData = [
        {
            element: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d={cashCoinIconPaths[0]} />
                        <path d={cashCoinIconPaths[1]} />
                        <path d={cashCoinIconPaths[2]} />
                        <path d={cashCoinIconPaths[3]} />
                    </svg>),
            title: "Revenue",
            data: "$17,000",
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
            data: "$14.32",
            timeframe: "Last Week"
        }
    ]
    return (
        <Card className="mt-3">
            <Card.Header>
                <h2 className="profile-header mb-2">Recent Performance</h2>
            </Card.Header>
            <Card.Body className="top-nav-body-wrapper">
                {iconData.map((icon, ind) => <TopBarIconShortcut iconData={icon} key={ind} />)}
            </Card.Body>
            <Card.Footer>
                <Button variant="primary">View More</Button>
            </Card.Footer>
        </Card>
    )
}

export default TopBar
