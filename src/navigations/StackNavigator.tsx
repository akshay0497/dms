import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/HomeScreen";
import { useTranslation } from "react-i18next";



const Stack = createStackNavigator<any>();

const StackNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />      
    </Stack.Navigator>
  );
};
export default StackNavigator;