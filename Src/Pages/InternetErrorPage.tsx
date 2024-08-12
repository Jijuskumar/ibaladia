import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const InternetErrorPage = ({navigation, route}: any) => {
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: '#fff',
            marginTop: 50,
          }}>
          <Image
            source={require('../Assets/Images/signal.png')}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontWeight: '800',
                marginTop: 20,
              }}>
              You're Offline!
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                fontWeight: '800',
                width: width * 0.8,
                textAlign: 'center',
                marginTop: 15,
              }}>
              Turn on mobile data or connnect to Wi-Fi. Or just take a break and
              go for a walk.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default InternetErrorPage;
