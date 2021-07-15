import React, {useState, useEffect, useCallback} from 'react';
import Card from 'react-bootstrap/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NewGoalForm from './NewGoalForm';
import ViewGoalForm from './ViewGoalForm';
import TabPanel from '../../utility/TabPanel';
import { useAuth } from '../../../contexts/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveGoals } from '../../../redux/goals/goalActions';
import LoadingSpinner from '../../utility/LoadingSpinner';
import { Alert } from 'react-bootstrap';

const Goals = () => {

    const handleTabChange = (event, newValue) => setValue(newValue)
    const [value, setValue] = useState(0);

    const {currentUser} = useAuth();
    const dispatch = useDispatch();

    const storedGoals = useSelector(state => state.goals.get);
    const loadingGoals = useSelector(state => state.goals.get.loading);
    const goalsCallFailed = useSelector(state => state.goals.get.error);
    const userHasIdInCollection = useSelector(state => state.goals.userHasGoals);
    const currentGoalList = useSelector(state => state.goals.goalsList);

    const getGoalsCallback = useCallback(() => {
        dispatch(retrieveGoals(currentUser.email))
    }, [currentUser.email, dispatch]);

    useEffect(() => {
        if (!storedGoals.data){
            getGoalsCallback();
        }
    }, [getGoalsCallback, storedGoals.data])

    return (
        <Card className="profile-card my-4 text-left">
            <Card.Header className="profile-header mb-2">
                <h2>Goal Setting</h2>
            </Card.Header>
            <Card.Body>
            {
                loadingGoals || loadingGoals === null
                ? 
                <LoadingSpinner alignment="center">Loading</LoadingSpinner>
                : 
                goalsCallFailed ? <Alert variant="danger" className="text-center mt-2">Could not retrieve goals. Please reload and try again.</Alert>
                :
                <React.Fragment>
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
                        <ViewGoalForm dispatch={dispatch} goals={currentGoalList} user={currentUser}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <NewGoalForm 
                            dispatch={dispatch}
                            user={currentUser}
                            hasCol={userHasIdInCollection}
                            goals={currentGoalList}/>
                    </TabPanel>
                </React.Fragment>
            }
            </Card.Body>
        </Card>
    )
}

export default Goals;
