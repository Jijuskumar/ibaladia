import React from 'react';
import {
  Platform,
  Linking,
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const WentwrongScreen = () => {
  const handlePressRetry = () => {};

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
            source={require('../Assets/Images/Oops.png')}
            resizeMode="contain"
            style={{
              width: 250,
              height: 270,
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
              Opps!
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
              We’re sorry. The page you requested could not be found.
            </Text>
          </View>

          <TouchableOpacity
            onPress={handlePressRetry}
            style={{
              height: 50,
              borderRadius: 10,
              backgroundColor: '#8084d4',
              alignItems: 'center',
              justifyContent: 'center',
              width: width * 0.8,
              marginBottom: 50,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '800',
              }}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default WentwrongScreen;
