import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import {EntryBO, TaskResponse} from '../BOs/TaskResponse';
import {getTaskList} from '../Services/ApiServices';
import {HttpStatus} from '../BOs/HttpStatus';
import {ScreenProps} from '../BOs/ScreenProps';
import {getHeight, getWidth, height, width} from '../Helper/DimensionsHelper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '../Components/Loader';
import Toast from 'react-native-toast-message';
import {LocalImages} from '../Assets/Images/Images';

const TaskPage: FC<ScreenProps> = props => {
  const [data, setData] = useState<EntryBO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      init();
    }, []),
  );

  const init = async () => {
    try {
      setLoading(true);
      const response = await getTaskList();

      if (response.status === HttpStatus.SUCCESS) {
        if (response.data) {
          const responsedata = (response.data as TaskResponse).entries;
          setData(responsedata);
        }
      } else if (response.status === HttpStatus.NOTFOUND) {
        setData([]);
      } else {
        setData([]);
        Toast.show({
          text1: 'Somthing went wrong please try after',
          type: 'error',
          position: 'top',
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        text1: 'Unexpected error occured please try after',
        type: 'error',
        position: 'top',
      });
    }
  };

  const navigateToDetails = (item: EntryBO) => {
    props.navigation.navigate('TaskDetails', item);
  };

  return (
    <>
      <View style={style.container}>
        {data.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={LocalImages.emptylist}
              style={{
                width: getWidth(80),
                height: getHeight(80),
                marginTop: -100,
              }}
            />
            <Text style={[style.textbold, {marginTop: 20}]}>
              لم يتم العثور على بيانات
            </Text>
          </View>
        ) : (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigateToDetails(item)}
                  style={[
                    style.listItem,
                    {
                      marginBottom: index === data.length - 1 ? 20 : 0,
                    },
                  ]}>
                  <Text style={style.text}>
                    اسم المهمة :{' '}
                    <Text style={style.textbold}>
                      {item.content.properties.task_name}
                    </Text>
                  </Text>
                  <Text style={style.text}>
                    التاريخ:{' '}
                    <Text style={[style.textbold, {color: '#34A853'}]}>
                      {item.content.properties
                        .packagesadvertisement_requerequest_date !== undefined
                        ? item.content.properties.packagesadvertisement_requerequest_date
                            .split('T')[0]
                            .split('-')
                            .reverse()
                            .join('-')
                        : '-'}
                    </Text>
                  </Text>
                  <Text style={style.text}>
                    رقم الطلب:{' '}
                    <Text style={[style.textbold]}>
                      {item.content.properties
                        .packagesadvertisement_requerequest_number ?? '-'}
                    </Text>
                  </Text>
                  <Text style={style.text}>
                    نوع الطلب:{' '}
                    <Text>
                      {item.content.properties
                        .packagesadvertisement_requeactivity_type_name ?? '-'}
                    </Text>
                  </Text>
                  <Text style={style.text}>
                    المنطقة:{' '}
                    <Text>
                      {item.content.properties
                        .packagesadvertisement_requeneighbourhood ?? '-'}
                    </Text>
                  </Text>
                  <Text style={style.text}>
                    حاجز:{' '}
                    <Text style={style.textbold}>
                      {item.content.properties
                        .packagesadvertisement_requeblock ?? '-'}
                    </Text>
                  </Text>
                  <Text style={style.text}>
                    قطعة:{' '}
                    <Text style={style.textbold}>
                      {item.content.properties
                        .packagesadvertisement_requeparcel ?? '-'}
                    </Text>
                  </Text>
                  <Text style={style.text}>
                    اسم نوع النشاط:{' '}
                    <Text>
                      {item.content.properties
                        .packagesadvertisement_requeactivity_type_name ?? '-'}
                    </Text>
                  </Text>
                  <Text style={style.text}>
                    رقم الرخصة:{' '}
                    <Text style={style.textbold}>
                      {item.content.properties
                        .packagesadvertisement_requelicense_number ?? '-'}
                    </Text>
                  </Text>
                  <Text style={style.text}>
                    تاريخ الترخيص:{' '}
                    <Text style={style.textbold}>
                      {item.content.properties
                        .packagesadvertisement_requelicense_date
                        ? item.content.properties.packagesadvertisement_requelicense_date
                            .split('T')[0]
                            .split('-')
                            .reverse()
                            .join('-')
                        : '-'}
                    </Text>
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
        )}
      </View>
      <Loader visible={loading} title="تحميل..." />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 15,
  },
  textbold: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
  },
  listItem: {
    width: width - getWidth(50),
    borderColor: '#34A853',
    borderWidth: 1,
    padding: 8,
    marginTop: 25,
    borderRadius: 8,
  },
});

export default TaskPage;
