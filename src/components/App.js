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

const App = () => {
  return (
      <ErrorBoundary>
          <AuthProvider>
            <UserProvider>
              <Provider store={store}>
                <Router>
                  <Root>
                    <AppRouting />
                  </Root>
                </Router>
              </Provider>
            </UserProvider>
        </AuthProvider>
      </ErrorBoundary>
  )
}

export default App;
