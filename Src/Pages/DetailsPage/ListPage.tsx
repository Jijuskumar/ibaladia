import React, {FC, useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, TextInput, Platform} from 'react-native';
import {getHeight, getWidth} from '../../Helper/DimensionsHelper';
import {LocalImages} from '../../Assets/Images/Images';
import {DocumentBO} from '../../BOs/DocumentBO';
import {
  deleteAttachmentUsingId,
  getAllDocuments,
  getDetailsById,
  getRequestById,
  updateTaskasCompleted,
  uploadAttachment,
} from '../../Services/ApiServices';
import {HttpStatus} from '../../BOs/HttpStatus';
import Toast from 'react-native-toast-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DocumentListComponent from '../../Components/DocumentListComponent';
import InfoDividerComponent from '../../Components/InfoDividerComponent';
import {RequestDetailsBO} from '../../BOs/RequestDetailsBO';
import {ScreenProps} from '../../BOs/ScreenProps';
import Loader from '../../Components/Loader';
import {launchCamera} from 'react-native-image-picker';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request as REQUEST,
} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {DetailsBO} from '../../BOs/DetailsBO';
import {style} from './ListPageStyle';
import {CompleteRequestBO} from '../../BOs/CompleteRequestBodyBO';
import {Link} from '../../BOs/TaskResponse';
import LicenceDetailsComponent from './LicenceDetailsComponent';
import AttachementsComponent from './AttachementsComponent';
import RequestInfoComponent from './RequestInfoComponent';

const TaskDetailsPage: FC<ScreenProps> = props => {
  const [comments, setComments] = useState<string>('');
  const [documents, setDocuments] = useState<DocumentBO[]>([]);
  const [attachments, setAttachments] = useState<DocumentBO[]>([]);
  const [request, setRequest] = useState<RequestDetailsBO>();
  const [licenceDetails, setlicenceDetails] = useState<DetailsBO>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, [props.route.params]);

  const init = async () => {
    setLoading(true);
    Promise.all([
      getUploadedDocuments(),
      getAttachments(),
      getRequest(),
      getDetails(),
    ]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
      const response = await getDetailsById(
        props.route.params.content.properties
          .packagesadvertisement_requerequest_number,
      );

      if (response.status === HttpStatus.SUCCESS) {
        if (
          response.data !== undefined &&
          (response.data as DetailsBO[]).length > 0
        ) {
          setlicenceDetails(response.data[0]);
        }
      } else if (response.status === HttpStatus.NOTFOUND) {
        setlicenceDetails(undefined);
      } else {
        setlicenceDetails(undefined);
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

  const onDeleteDocument = async (doc: DocumentBO) => {
    try {
      const response = await deleteAttachmentUsingId(doc.id);

      if (response.status === HttpStatus.SUCCESS) {
        const cloned = [...documents];
        const filtered = cloned.filter(item => item.id === doc.id);
        setDocuments(filtered);
        Toast.show({
          text1: 'Document uploaded successfully',
          type: 'success',
          position: 'top',
        });
      } else {
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

  const updateTask = async () => {
    try {
      const statusUrl = props.route.params.content.links.filter(
        (item: Link) => item.rel === 'self',
      )[0];
      const body: CompleteRequestBO = {
        app_url: 'ShopLicenseApp',
        status_url: `${statusUrl.href}/status`,
        request_body: {
          complete: {
            data: {
              packages: {
                advertisement_request: {
                  properties: {
                    request_status_name: 'إكتمل التفتيش',
                    request_status: 8,
                    comments: comments ?? '',
                    id: props.route.params.content.properties
                      .packagesadvertisement_requeid,
                  },
                  href: `business-objects/alp_advertisement_reque/${props.route.params.content.properties.packagesadvertisement_requeid}`,
                },
              },
              variables: {},
            },
          },
        },
      };

      const response = await updateTaskasCompleted(body);

      if (response.status === HttpStatus.SUCCESS) {
        Toast.show({
          text1: 'Document uploaded successfully',
          type: 'success',
          position: 'top',
        });
      } else {
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

  const uploadImage = async () => {
    try {
      const hasPermission = await requestCameraPermission();

      if (hasPermission) {
        launchCamera({mediaType: 'photo'}, async response => {
          if (response.didCancel) {
            // canceled
          } else if (response.errorCode) {
            // error happpend
          } else if (response.assets && response.assets.length > 0) {
            const image = response.assets[0];
            // console.log(image.uri);
            // const base64String = await RNFS.readFile(ima

            // console.log('byteArray', byteArray);

            const resposne = await uploadAttachment(
              image,
              props.route.params,
              request?.i_folder_id[0] || '',
            );
          }
        });
      } else {
        Toast.show({
          text1: 'Camera permission is denied',
          type: 'error',
          position: 'top',
        });
      }
    } catch (error) {
      console.log('the error code is', error);
      Toast.show({
        text1: 'Somthing went wrong please try after',
        type: 'error',
        position: 'top',
      });
    }
  };

  const base64ToByteArray = (base64: string) => {
    const binaryString = atob(base64);
    const byteArray = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    return byteArray;
  };

  const requestCameraPermission = async () => {
    let permission;
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.CAMERA;
    } else {
      permission = PERMISSIONS.ANDROID.CAMERA;
    }

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    } else if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
      const requestResult = await REQUEST(permission);
      return requestResult === RESULTS.GRANTED;
    } else {
      return false;
    }
  };

  return (
    <>
      <View style={style.container}>
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
              <TouchableOpacity
                onPress={uploadImage}
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
              </TouchableOpacity>
              <View style={style.documentsContainer}>
                {documents.map((doc: DocumentBO, index: number) => {
                  return (
                    <DocumentListComponent
                      key={doc.id}
                      index={index}
                      doc={doc}
                      onPreddDelete={onDeleteDocument}
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
          <RequestInfoComponent request={request} />
          {licenceDetails && (
            <LicenceDetailsComponent licenceDetails={licenceDetails} />
          )}
          <AttachementsComponent
            attachments={attachments}
            onPressView={onViewDocument}
          />
        </ScrollView>
      </View>
      <Loader visible={loading} />
    </>
  );
};

export default TaskDetailsPage;
