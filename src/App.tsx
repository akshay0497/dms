import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigations/DrawerNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/localization/i18n';
import { loadUserData } from './src/redux/reducers/authReducer';
import { AppDispatch } from './src/redux/store';

const App = () => {
  useEffect(() => {
    // Load user data from AsyncStorage on app start
    const loadInitialData = async () => {
      const action = await loadUserData();
      (store.dispatch as AppDispatch)(action);
    };
    loadInitialData();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;