import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import RootNavigation from './Src/Navigations/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
