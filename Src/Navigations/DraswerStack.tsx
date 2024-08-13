import {
  createDrawerNavigator,
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
import ListPage from '../Pages/ListPage';
import InternetErrorPage from '../Pages/InternetErrorPage';
import {LocalImages} from '../Assets/Images/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskPage from '../Pages/TaskPage';
import TaskStack from './TaskStack';

interface MenuItemProps {
  image: ImageSourcePropType;
  text: string;
  onPress: () => void;
}

const CustomDrawerContent = ({navigation, route}: any) => {
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <View style={style.drawer}>
      <View style={style.drawerContainer}>
        <View>
          <Text style={{fontSize: getWidth(16), color: '#000'}}>shopinsp</Text>
          <Text style={{fontSize: getWidth(15), color: '#000'}}>shopinsp</Text>
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
          navigation.navigate('Home');
        }}
      />
      <MenuItem
        text="تسجيل الخروج"
        image={LocalImages.logout}
        onPress={logout}
      />
    </View>
  );
};

const MenuItem: FC<MenuItemProps> = props => {
  return (
    <TouchableOpacity style={style.menuItem} onPress={props.onPress}>
      <Text
        style={{
          color: '#000',
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
                <Text style={style.headerText}>{props.route.name}</Text>
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
    fontSize: getHeight(18),
    fontWeight: '600',
    marginLeft: getWidth(50),
  },
});

export default DraswerStack;
