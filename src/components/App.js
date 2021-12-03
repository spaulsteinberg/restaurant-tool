import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './main/Root';
import ErrorBoundary from './ErrorBoundary';
import { UserProvider } from '../contexts/UserContext';
import {Provider} from 'react-redux';
import store from '../redux/store';
import AppRouting from './AppRouting';
import '../styles/styles.scss';
import { ThemeProvider } from '../contexts/ThemeContext';

const App = () => {
  return (
      <ErrorBoundary>
          <AuthProvider>
            <UserProvider>
              <ThemeProvider>
                <Provider store={store}>
                  <Router>
                    <Root>
                      <AppRouting />
                    </Root>
                  </Router>
                </Provider>
              </ThemeProvider>
            </UserProvider>
        </AuthProvider>
      </ErrorBoundary>
  )
}

export default App;
