import React, { useContext, useReducer } from 'react';
import { themeReducer } from '../reducers/themeReducer';

const ThemeContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = props => {
    const [state, dispatch] = useReducer(themeReducer, {padded: true});

    return <ThemeContext.Provider value={{state: state, dispatch: dispatch}}>{props.children}</ThemeContext.Provider>
}