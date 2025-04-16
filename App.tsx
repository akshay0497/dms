import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { ThemeProvider } from './src/theme/ThemeContext';
import DrawerNavigator from './src/navigations/DrawerNavigator';
import SplashScreen from 'react-native-splash-screen';
import './src/localization/i18n';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
