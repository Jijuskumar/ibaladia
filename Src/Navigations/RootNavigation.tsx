import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import InternetErrorPage from '../Pages/InternetErrorPage';
import LoginPage from '../Pages/LoginPage';
import SplashPage from '../Pages/SplashPage';
import TaskPage from '../Pages/TaskPage';
import DraswerStack from './DraswerStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateUser} from '../Redux/Reducers/userReducer';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const user = await AsyncStorage.getItem('account');
      if (user) {
        dispatch(updateUser(JSON.parse(user)));
      }
    };
    init();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Home" component={DraswerStack} />
      <Stack.Screen name="InterNetError" component={InternetErrorPage} />
      <Stack.Screen name="WentWrong" component={TaskPage} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
