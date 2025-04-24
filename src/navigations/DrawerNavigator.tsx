import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CustomDrawerContent from './CustomDrawerContent';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import AboutScreen from '../screens/About/AboutScreen';
import TotalDocument from '../screens/TotalDocument/TotalDocument';
import TotalIndexFile from '../screens/TotalIndexFile/TotalIndexFile';
import TotalDocumentType from '../screens/TotalDocumentType/TotalDocumentType';
import TotalSplitFile from '../screens/TotalSplitFile/TotalSplitFile';

export type RootDrawerParamList = {
  Home: undefined;
  Login: undefined;
  About: undefined;
  'Total Document': undefined;
  'Total Index File': undefined;
  'Total Document Type': undefined;
  'Total Split File': undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        swipeEnabled: isLoggedIn,
        drawerStyle: {
          width: isLoggedIn ? '80%' : '0%',
        },
        headerShown: false
      }}
    >
      {isLoggedIn ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Total Document" component={TotalDocument} />
          <Drawer.Screen name="Total Index File" component={TotalIndexFile} />
          <Drawer.Screen name="Total Document Type" component={TotalDocumentType} />
          <Drawer.Screen name="Total Split File" component={TotalSplitFile} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </>
      ) : (
        <Drawer.Screen name="Login" component={LoginScreen} />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator; 