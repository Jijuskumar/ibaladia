import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import RootNavigation from './Src/Navigations/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './Src/Redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
