import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import InternetErrorPage from '../Pages/InternetErrorPage';
import LoginPage from '../Pages/LoginPage';
import SplashPage from '../Pages/SplashPage';
import ListPage from '../Pages/ListPage';
import TaskPage from '../Pages/TaskPage';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Home" component={ListPage} />
      <Stack.Screen name="InterNetError" component={InternetErrorPage} />
      <Stack.Screen name="WentWrong" component={TaskPage} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
