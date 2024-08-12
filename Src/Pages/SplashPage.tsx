import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import React, {FC, useEffect} from 'react';
import {View, Text, StatusBar, Image, StyleSheet} from 'react-native';
import {ScreenProps} from '../BOs/ScreenProps';

const SplashPage: FC<ScreenProps> = ({navigation, route}) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (!state.isConnected) {
        navigation.replace('InterNetError');
      } else {
        init();
      }
    });

    return () => unsubscribe();
  }, []);

  const init = async () => {
    setTimeout(async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (accessToken === null || accessToken === '') {
        navigation.replace('Login');
      } else {
        navigation.replace('Home');
      }
    }, 500);
  };

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={style.container}>
        <Image
          source={require('../Assets/Images/AppIcon.png')}
          style={style.image}
        />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SplashPage;
