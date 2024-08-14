import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerHeaderProps,
  useDrawerStatus,
} from '@react-navigation/drawer';
import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getHeight, getWidth} from '../Helper/DimensionsHelper';
import LinearGradient from 'react-native-linear-gradient';
import InternetErrorPage from '../Pages/InternetErrorPage';
import {LocalImages} from '../Assets/Images/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskStack from './TaskStack';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/Store';
import {getConvertedName} from '../Helper/Conversions';

interface MenuItemProps {
  image: ImageSourcePropType;
  text: string;
  onPress: () => void;
}

interface DrawerContentProps {
  navigation: DrawerContentComponentProps;
  route: any;
}

const CustomDrawerContent: FC<DrawerContentComponentProps> = ({navigation}) => {
  const user = useSelector((state: RootState) => state.user.value);

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View style={style.drawer}>
      <View style={{flex: 1}}>
        <View style={style.drawerContainer}>
          <View>
            <Text style={{fontSize: getWidth(16), color: '#000'}}>
              {user.name}
            </Text>
            <Text style={{fontSize: getWidth(15), color: '#000'}}>
              {user.label}
            </Text>
          </View>
          <View style={{marginLeft: getWidth(15)}}>
            <Image
              source={LocalImages.account}
              style={{width: getWidth(18), height: getHeight(18)}}
            />
          </View>
        </View>
        <MenuItem
          text="قائمة الخدمات"
          image={LocalImages.home}
          onPress={() => {
            navigation.navigate('Task', {screen: 'TaskList'});
          }}
        />
        <MenuItem
          text="تسجيل الخروج"
          image={LocalImages.logout}
          onPress={logout}
        />
      </View>
      <View
        style={{
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#d3d3d35a',
          borderTopColor: '#d3d3d3',
          borderTopWidth: 1,
        }}>
        <Text style={style.versionText}>V2023.3.1</Text>
      </View>
    </View>
  );
};

const MenuItem: FC<MenuItemProps> = props => {
  return (
    <TouchableOpacity style={style.menuItem} onPress={props.onPress}>
      <Text
        style={{
          color: '#000',
          fontFamily: 'NotoSans-Regular, NotoSansArabic-Medium',
        }}>
        {props.text}
      </Text>
      <Image source={props.image} style={style.menuIcon} />
    </TouchableOpacity>
  );
};

const DraswerStack = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerStyle: {
          width: '70%',
        },
        header: (props: DrawerHeaderProps) => {
          const isDrawerOpen = useDrawerStatus() === 'open';
          return (
            <LinearGradient
              colors={['#DECFA0', '#CFB267']}
              style={style.headerWrapper}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={style.headerText}>
                  {getConvertedName(props.route.name)}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  isDrawerOpen
                    ? props.navigation.closeDrawer()
                    : props.navigation.openDrawer()
                }
                style={{
                  paddingHorizontal: getWidth(10),
                  height: getHeight(50),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: getWidth(25),
                    height: getHeight(25),
                    tintColor: '#000',
                  }}
                  source={LocalImages.menu}
                />
              </TouchableOpacity>
            </LinearGradient>
          );
        },
      }}>
      <Drawer.Screen name="Task" component={TaskStack} />
      <Drawer.Screen name="Logout" component={InternetErrorPage} />
    </Drawer.Navigator>
  );
};

const style = StyleSheet.create({
  drawerContainer: {
    padding: getWidth(15),
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#d3d3d32a',
  },
  drawer: {
    flex: 1,
    borderLeftColor: '#d3d3d3',
    borderLeftWidth: 1,
  },
  menuItem: {
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  menuIcon: {
    width: getWidth(18),
    height: getWidth(18),
    marginLeft: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: getHeight(50),
    width: '100%',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    backgroundColor: '#1a1a1a',
  },
  headerText: {
    color: '#000',
    fontSize: getHeight(20),
    fontWeight: '600',
    marginLeft: getWidth(50),
  },
  versionText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DraswerStack;
