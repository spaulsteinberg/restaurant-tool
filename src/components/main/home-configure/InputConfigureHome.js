import React, { useEffect } from 'react'
import InputBackgroundPhoto from './InputBackgroundPhoto';
import InputLinks from './InputLinks';
import InputMainDescription from './InputMainDescription';
import InputRestaurantName from './InputRestaurantName';
import './home-styles.scss';
import { useTheme } from '../../../contexts/ThemeContext';
import { SET_PADDED, UNSET_PADDED } from '../../../reducers/themeReducer';

const InputConfigureHome = () => {
    const theme = useTheme();

    useEffect(() => {
        theme.dispatch({type: UNSET_PADDED})
        return () => {
            theme.dispatch({type: SET_PADDED})
        }
        // eslint-disable-next-line
    }, [])

    return (
        <React.Fragment>
            <InputBackgroundPhoto />
            <div className="home-input-container my-3">
                <InputRestaurantName />
                <InputMainDescription />
                <InputLinks />
            </div>
        </React.Fragment>
    )
}

export default InputConfigureHome;
