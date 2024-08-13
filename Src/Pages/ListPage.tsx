import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {getHeight, getWidth, width} from '../Helper/DimensionsHelper';
import {LocalImages} from '../Assets/Images/Images';
import {DocumentBO} from '../BOs/DocumentBO';
import {
  getAllDocuments,
  getDetailsById,
  getRequestById,
} from '../Services/ApiServices';
import {HttpStatus} from '../BOs/HttpStatus';
import Toast from 'react-native-toast-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DocumentListComponent from '../Components/DocumentListComponent';
import InfoDividerComponent from '../Components/InfoDividerComponent';
import {RequestDetailsBO} from '../BOs/RequestDetailsBO';
import {ScreenProps} from '../BOs/ScreenProps';
import AttachmentListComponent from '../Components/AttachmentListComponent';

const ListPage: FC<ScreenProps> = props => {
  const [comments, setComments] = useState<string>('');
  const [documents, setDocuments] = useState<DocumentBO[]>([]);
  const [attchments, setAttachments] = useState<DocumentBO[]>([]);
  const [request, setRequest] = useState<RequestDetailsBO>();
  const [details, setDetails] = useState();

  useEffect(() => {
    init();
  }, [props.route.params]);

  const init = async () => {
    await getUploadedDocuments();
    await getAttachments();
    await getRequest();
    await getDetails();
  };

  const getAttachments = async () => {
    try {
      const response = await getAllDocuments(
        props.route.params.content.properties
          .packagesadvertisement_requerequest_number,
        1,
      );

      if (response.status === HttpStatus.SUCCESS) {
        setAttachments(response.data!);
      } else if (response.status === HttpStatus.NOTFOUND) {
        setAttachments([]);
      } else {
        setAttachments([]);
        Toast.show({
          text1: 'Somthing went wrong please try after',
          type: 'error',
          position: 'top',
        });
      }
    } catch (error) {
      Toast.show({
        text1: 'Unexpected error occured please try after',
        type: 'error',
        position: 'top',
      });
    }
  };

  const getUploadedDocuments = async () => {
    try {
      const response = await getAllDocuments(
        props.route.params.content.properties
          .packagesadvertisement_requerequest_number,
        2,
      );

      if (response.status === HttpStatus.SUCCESS) {
        setDocuments(response.data!);
      } else if (response.status === HttpStatus.NOTFOUND) {
        setDocuments([]);
      } else {
        setDocuments([]);
        Toast.show({
          text1: 'Somthing went wrong please try after',
          type: 'error',
          position: 'top',
        });
      }
    } catch (error) {
      Toast.show({
        text1: 'Unexpected error occured please try after',
        type: 'error',
        position: 'top',
      });
    }
  };

  const getRequest = async () => {
    try {
      const response = await getRequestById(
        props.route.params.content.properties.packagesadvertisement_requeid,
      );

      if (response.status === HttpStatus.SUCCESS) {
        setRequest(response.data!);
      } else if (response.status === HttpStatus.NOTFOUND) {
        setRequest(undefined);
      } else {
        setRequest(undefined);
        Toast.show({
          text1: 'Somthing went wrong please try after',
          type: 'error',
          position: 'top',
        });
      }
    } catch (error) {
      Toast.show({
        text1: 'Unexpected error occured please try after',
        type: 'error',
        position: 'top',
      });
    }
  };

  const getDetails = async () => {
    try {
      console.log(
        'getattachments',
        props.route.params.content.properties
          .packagesadvertisement_requerequest_number,
      );
      const response = await getDetailsById(
        props.route.params.content.properties
          .packagesadvertisement_requerequest_number,
      );

      if (response.status === HttpStatus.SUCCESS) {
        setDetails(response.data!);
      } else if (response.status === HttpStatus.NOTFOUND) {
        setDetails(undefined);
      } else {
        setDetails(undefined);
        Toast.show({
          text1: 'Somthing went wrong please try after',
          type: 'error',
          position: 'top',
        });
      }
    } catch (error) {
      Toast.show({
        text1: 'Unexpected error occured please try after',
        type: 'error',
        position: 'top',
      });
    }
  };
  const onViewDocument = (doc: DocumentBO) => {};

  const onDeleteDocument = (doc: DocumentBO) => {};

  const updateTask = () => {};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <ScrollView style={{flex: 1}}>
        <View style={style.content}>
          <View style={style.contentHeader}>
            <Text
              style={[
                style.text,
                {
                  marginRight: getWidth(10),
                  fontSize: 20,
                  fontWeight: '600',
                },
              ]}>
              تقرير التفتيش
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <View style={{flex: 1}}>
              <Text style={style.text}>
                الحالة : <Text style={style.text}>غير نشط</Text>
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={style.text}>
                بدأ في :{' '}
                <Text style={style.text}>
                  {request?.r_creation_date.split('T')[0]}
                </Text>
              </Text>
            </View>
            <View style={{flex: 1.25}}>
              <Text style={style.text}>
                مخصص ل : <Text style={style.text}>{request?.inspector}</Text>
              </Text>
            </View>
          </View>
          <Text style={style.headingText}>تعليقات</Text>
          <TextInput
            value={comments}
            onChangeText={setComments}
            style={style.input}
          />
          <View style={style.uploadWrapper}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, color: '#000'}}>اضف صورة</Text>
              <Image
                source={LocalImages.camera}
                style={{
                  width: getWidth(20),
                  height: getHeight(18),
                  tintColor: '#ce7e00',
                  marginLeft: 20,
                }}
              />
            </View>
            <View style={style.documentsContainer}>
              {documents.map((doc: DocumentBO, index: number) => {
                return (
                  <DocumentListComponent
                    index={index}
                    doc={doc}
                    onPreddDelete={onViewDocument}
                    onPressView={onViewDocument}
                  />
                );
              })}
            </View>
          </View>
          <TouchableOpacity onPress={updateTask} style={style.submitButton}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
              ارسال
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.content}>
          <View style={style.contentHeader}>
            <Text
              style={[
                style.text,
                {
                  marginRight: getWidth(10),
                  fontSize: 20,
                  fontWeight: '600',
                },
              ]}>
              طلب تفاصيل
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <InfoDividerComponent
              primaryText={'حالة الطلب : ' + request?.request_number}
              secondaryText={'رقم الطلب : ' + request?.request_status}
            />
            <InfoDividerComponent
              secondaryText={
                'تاريخ الطلب : ' +
                request?.license_date
                  ?.split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-')
              }
              primaryText={'رقم الرخصة :' + request?.license_number}
            />
            <InfoDividerComponent
              primaryText={
                'تاريخ إصدار الترخيص :' +
                request?.issue_date
                  ?.split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-')
              }
              secondaryText={
                'تاريخ انتهاء الترخيص : ' +
                request?.expiry_date
                  ?.split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-')
              }
            />
            <InfoDividerComponent
              secondaryText={'إجمالي الرسوم :' + request?.total_fees}
            />
          </View>
          <View
            style={[
              style.uploadWrapper,
              {backgroundColor: '#fff', borderWidth: 1, borderColor: '#d3d3d3'},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: getHeight(50),
                backgroundColor: '#d3d3d3',
              }}>
              <Text style={{fontSize: 20, color: '#000', marginRight: 10}}>
                بيانات التجارة
              </Text>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <InfoDividerComponent
                primaryText={'الرقم المدني للشركة :' + request?.shop_civil_id}
                secondaryText={
                  'رقم الترخيص التجاري:' + request?.moci_license_numer
                }
              />
              <InfoDividerComponent
                primaryText={'اسم المحل' + request?.shop_name}
                secondaryText={'اسم نوع النشاط' + request?.activity_type_name}
              />
              <InfoDividerComponent
                primaryText={
                  'تاريخ الإصدار :' + request?.issue_date.split('T')[0]
                }
                secondaryText={
                  'تاريخ الانتهاء :' + request?.expiry_date.split('T')[0]
                }
              />
              <InfoDividerComponent
                secondaryText={'رقم الوحدة :' + request?.paci_number}
              />
            </View>
          </View>
          <View
            style={[
              style.uploadWrapper,
              {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#d3d3d3',
                marginTop: 15,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: getHeight(50),
                backgroundColor: '#d3d3d3',
              }}>
              <Text style={{fontSize: 20, color: '#000', marginRight: 10}}>
                عنوان البلدية
              </Text>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <InfoDividerComponent
                primaryText={'محافظة :' + request?.governorate}
                secondaryText={'قطعة :' + request?.block}
              />
              <InfoDividerComponent
                primaryText={'منطقة :'}
                secondaryText={'قسيمة :' + request?.parcel}
              />
              <InfoDividerComponent
                primaryText={'رقم القسيمة :' + request?.parcel_number}
                secondaryText={'نوع الاستعمال :'}
              />
              <InfoDividerComponent secondaryText={'الدور :'} />
              <InfoDividerComponent
                primaryText={'رقم الوحدة :'}
                secondaryText={`مالك المبنى :' ${
                  request?.building_owner ?? ''
                }`}
              />
            </View>
          </View>
        </View>
        <View style={style.content}>
          <View style={style.contentHeader}>
            <Text
              style={[
                style.text,
                {
                  marginRight: getWidth(10),
                  fontSize: 20,
                  fontWeight: '600',
                },
              ]}>
              وصف الإعلان
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <InfoDividerComponent
              primaryText={'اسم نوع الترخيص'}
              secondaryText={'سم نوع الإعلان'}
            />
            <InfoDividerComponent
              secondaryText={'موقع الإعلان'}
              primaryText={'عرض'}
            />
            <InfoDividerComponent
              primaryText={'طول'}
              secondaryText={'هل يوجد شعار'}
            />
          </View>
        </View>
        <View style={[style.content, {marginBottom: 40}]}>
          <View style={style.contentHeader}>
            <Text
              style={[
                style.text,
                {
                  marginRight: getWidth(10),
                  fontSize: 20,
                  fontWeight: '600',
                },
              ]}>
              المرفقات
            </Text>
          </View>
          {attchments.map((doc: DocumentBO, index: number) => {
            return (
              <AttachmentListComponent
                doc={doc}
                index={index}
                isLast={index === attchments.length - 1}
                onPressView={onViewDocument}
                key={doc.id}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 15,
  },
  headingText: {
    fontSize: 18,
    color: '#000',
    marginRight: 10,
    marginTop: 20,
  },
  input: {
    height: getHeight(40),
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  uploadWrapper: {
    marginHorizontal: getWidth(10),
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    paddingBottom: getHeight(5),
  },
  documentsContainer: {
    marginHorizontal: getWidth(8),
    backgroundColor: '#fff',
  },
  documentList: {
    width: '100%',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  listColumn: {
    flex: 2,
    alignItems: 'flex-end',
    height: '100%',
    marginRight: 5,
  },
  submitButton: {
    height: 50,
    backgroundColor: '#BF9C38',
    marginHorizontal: getWidth(10),
    marginTop: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width - getWidth(40),
    borderRadius: 8,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginTop: 25,
    paddingBottom: 8,
    marginBottom: 5,
  },
  contentHeader: {
    height: 45,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default ListPage;
