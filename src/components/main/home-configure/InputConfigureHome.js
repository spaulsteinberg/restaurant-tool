import React, { useEffect } from 'react'
import './home-styles.scss';
import { useTheme } from '../../../contexts/ThemeContext';
import { SET_PADDED, UNSET_PADDED } from '../../../reducers/themeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveHomeConfig } from '../../../redux/home/homeActions';
import LoadingSpinner from '../../utility/LoadingSpinner';
import InputConfigureView from './InputConfigureView';
import ErrorMessageBlock from '../../utility/ErrorMessageBlock';

const InputConfigureHome = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const homeState = useSelector(state => state.home);

    useEffect(() => {
        theme.dispatch({type: UNSET_PADDED})
        !homeState.data && dispatch(retrieveHomeConfig())
        return () => {
            theme.dispatch({type: SET_PADDED})
        }
        // eslint-disable-next-line
    }, [])

    return (
        <React.Fragment>
            {
                homeState.loading ? <LoadingSpinner alignment="center" variant="primary" marginTop="3rem">Loading Config</LoadingSpinner>
                : homeState.data ? <InputConfigureView data={homeState.data} />
                : homeState.error ? <ErrorMessageBlock message={homeState.error} adjustment={3}/>
                : null
            }
        </React.Fragment>
    )
}

export default InputConfigureHome;
