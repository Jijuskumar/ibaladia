import React, {FC, useEffect, useState} from 'react';
import {
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {getHeight, getWidth, height, width} from '../Helper/DimensionsHelper';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import {LoginUserBO} from '../BOs/LoginUserBO';
import {loginUser} from '../Services/ApiServices';
import {HttpStatus} from '../BOs/HttpStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import Toast from 'react-native-toast-message';
import {ScreenProps} from '../BOs/ScreenProps';
import {useDispatch} from 'react-redux';
import {updateUser} from '../Redux/Reducers/userReducer';

const LoginPage: FC<ScreenProps> = props => {
  const isRTL = I18nManager.isRTL;
  const [loginCreds, setLoginCreds] = useState<LoginUserBO>({
    username: '',
    password: '',
  });
  const [usernameErr, setUsernameErr] = useState<boolean>(false);
  const [passwordErr, SetPasswordErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onChangeText = (text: string, name: 'username' | 'password') => {
    const clonedLoginCreds = {...loginCreds};
    clonedLoginCreds[name] = text;
    setLoginCreds(clonedLoginCreds);
  };

  const login = async () => {
    try {
      validateUsername(loginCreds.username);
      validatePassword(loginCreds.password);
      if (
        validateUsername(loginCreds.username) &&
        validatePassword(loginCreds.password)
      ) {
        setLoading(true);
        const response = await loginUser(loginCreds);

        if (response.status === HttpStatus.SUCCESS) {
          const originalString =
            loginCreds.username.trim() + ':' + loginCreds.password.trim();
          const accessToken = base64.encode(originalString);
          await AsyncStorage.setItem('accessToken', accessToken);
          if (response.data) {
            dispatch(updateUser(response.data));
            await AsyncStorage.setItem(
              'account',
              JSON.stringify(response.data),
            );
          }
          Toast.show({
            text1: 'Successfully logined',
            type: 'success',
            position: 'top',
          });
          setTimeout(() => {
            props.navigation.replace('Home');
          }, 500);
        } else if (response.status == HttpStatus.UNAUTHORIZED) {
          setUsernameErr(true);
          SetPasswordErr(true);
          Toast.show({
            text1: 'Invalid Credentials',
            type: 'error',
            position: 'top',
          });
        } else {
          Toast.show({
            text1: 'Something went wrong',
            type: 'info',
            position: 'top',
          });
        }
        setLoading(false);
      }
    } catch (error) {
      Toast.show({
        text1: 'Unexpected error occured please try after',
        type: 'error',
        position: 'top',
      });
      setLoading(false);
    }
  };

  const validateUsername = (text: string) => {
    if (text.trim() === '') {
      setUsernameErr(true);
      return false;
    } else {
      setUsernameErr(false);
      return true;
    }
  };

  const validatePassword = (text: string) => {
    if (text.trim() === '') {
      SetPasswordErr(true);
      return false;
    } else {
      SetPasswordErr(false);
      return true;
    }
  };

  return (
    <View style={style.container}>
      <LinearGradient colors={['#DECFA0', '#CFB267']} style={style.header}>
        <Text style={{color: '#000', fontSize: 24, fontWeight: '700'}}>
          تسجيل الدخول
        </Text>
      </LinearGradient>
      <View style={style.contentContainer}>
        <Image
          style={{
            width: getWidth(200),
            height: getWidth(200),
          }}
          source={require('../Assets/Images/AppIcon.png')}
        />
        <Text style={style.titleText}>iBaladia البلدية الألكترونية</Text>
        <View style={style.inputContainer}>
          <Text style={style.text}>اسم المستخدم</Text>
          <TextInput
            value={loginCreds.username}
            onChangeText={text => onChangeText(text, 'username')}
            placeholder="أدخل النص"
            placeholderTextColor={'#d3d3d3'}
            textAlign="right"
            onBlur={() => validateUsername(loginCreds.username)}
            style={[
              style.textInput,
              {
                writingDirection: isRTL ? 'rtl' : 'ltr',
                borderColor: usernameErr ? 'red' : '#ccc',
              },
            ]}
          />
          <Text style={style.text}>كلمة السر</Text>
          <TextInput
            value={loginCreds.password}
            onChangeText={text => onChangeText(text, 'password')}
            placeholder="أدخل النص"
            placeholderTextColor={'#d3d3d3'}
            textAlign="right"
            onBlur={() => validatePassword(loginCreds.password)}
            style={[
              style.textInput,
              {
                writingDirection: isRTL ? 'rtl' : 'ltr',
                borderColor: passwordErr ? 'red' : '#ccc',
              },
            ]}
          />
        </View>
        <TouchableOpacity
          style={style.button}
          activeOpacity={0.8}
          onPress={login}>
          {loading ? (
            <ActivityIndicator color={'#fff'} size={25} />
          ) : (
            <>
              <Text style={style.loginText}>تسجيل الدخول</Text>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: '#fff',
                  marginLeft: 10,
                }}
                source={require('../Assets/Images/login.png')}
              />
            </>
          )}
        </TouchableOpacity>
        <View style={{width: width - getWidth(30)}}>
          <Text style={style.forgotText}>تعليمات التطبيق ؟</Text>
        </View>
      </View>
      <View style={style.versionContainer}>
        <Text style={style.versionText}>Ver: {DeviceInfo.getVersion()}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textInput: {
    borderBottomColor: '#53BDEB',
    borderBottomWidth: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#000',
    marginTop: 10,
    borderRadius: 5,
  },
  inputContainer: {
    width: width - getWidth(30),
    elevation: 10,
    backgroundColor: '#FFF',
    padding: 10,
    paddingBottom: 30,
    marginTop: 40,
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  titleText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '700',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#53BDEB6a',
    height: getHeight(45),
    width: width - getWidth(30),
    borderRadius: 3,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  forgotText: {
    fontSize: 16,
    color: '#0000E7',
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 10,
  },
  header: {
    height: getHeight(50),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginIcon: {
    width: getWidth(20),
    height: getWidth(20),
    tintColor: '#fff',
    marginLeft: 10,
  },
  versionText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
  versionContainer: {
    height: getHeight(30),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: getWidth(15),
    alignItems: 'center',
  },
});

export default LoginPage;
