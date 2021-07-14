import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NewGoalForm from './NewGoalForm';
import TabPanel from '../../utility/TabPanel';


const Goals = () => {

    const handleTabChange = (event, newValue) => {
        console.log("tab change")
        setValue(newValue)
    }
    const [value, setValue] = useState(0);

    return (
        <Card className="profile-card my-4 text-left">
            <Card.Header className="profile-header mb-2">
                <h2>Goal Setting</h2>
            </Card.Header>
            <Card.Body>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={value}
                    onChange={handleTabChange}
                    aria-label="goal tabs"
                    centered
                >
                    <Tab label="View/Edit" />
                    <Tab label="New" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    hello world
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <NewGoalForm />
                </TabPanel>
            </Card.Body>
        </Card>
    )
}

export default Goals;
