import axios, {AxiosError, AxiosResponse} from 'axios';
import {LoginUserBO} from '../BOs/LoginUserBO';
import DeviceInfo from 'react-native-device-info';
import base64 from 'base-64';
import {HttpStatus} from '../BOs/HttpStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Asset} from 'react-native-image-picker';
import {EntryBO} from '../BOs/TaskResponse';
import {CompleteRequestBO} from '../BOs/CompleteRequestBodyBO';

const httpClinet = axios.create({
  baseURL: 'http://mobile.baladia.gov.kw:8181/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (creds: LoginUserBO) => {
  try {
    const uuid = await DeviceInfo.getUniqueId();
    const manufacturer = await DeviceInfo.getManufacturer();

    const originalString = creds.username.trim() + ':' + creds.password.trim();
    const accessToken = base64.encode(originalString);

    const data = {
      user: {
        username: creds.username,
      },
      device: {
        username: creds.username,
        uuid: uuid,
        platform: DeviceInfo.getSystemName(),
        manufacturer: manufacturer,
      },
    };

    const response = await httpClinet.post(
      'KM_MOBILE_SERVICE/auth/employee/login',
      data,
      {
        headers: {
          kmmv: '2023.3.1',
          Authorization: 'Basic ' + accessToken,
        },
      },
    );

    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

export const getTaskList = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const response = await httpClinet.post(
        'KM_MOBILE_SERVICE/shop-aedev-license/tasks',
        undefined,
        {
          headers: {
            kmmv: '2023.3.1',
            authorization: 'Basic ' + accessToken,
          },
        },
      );

      return handleResponse(response);
    } else {
      const httpResponse = {
        status: HttpStatus.UNAUTHORIZED,
        data: undefined,
      };

      return httpResponse;
    }
  } catch (error) {
    console.log(error);
    return handleError(error as AxiosError);
  }
};

export const getAllDocuments = async (requestId: string, type: number) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const response = await httpClinet.get(
        `KM_MOBILE_SERVICE/shop-aedev-license/attachments/${requestId}?document_type_id=${type}`,
        {
          headers: {
            kmmv: '2023.3.1',
            authorization: 'Basic ' + accessToken,
          },
        },
      );

      return handleResponse(response);
    } else {
      const httpResponse = {
        status: HttpStatus.UNAUTHORIZED,
        data: undefined,
      };

      return httpResponse;
    }
  } catch (error) {
    console.log(error);
    return handleError(error as AxiosError);
  }
};

export const getRequestById = async (id: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const response = await httpClinet.get(
        `KM_MOBILE_SERVICE/shop-aedev-license/request/${id}`,
        {
          headers: {
            kmmv: '2023.3.1',
            authorization: 'Basic ' + accessToken,
          },
        },
      );

      return handleResponse(response);
    } else {
      const httpResponse = {
        status: HttpStatus.UNAUTHORIZED,
        data: undefined,
      };

      return httpResponse;
    }
  } catch (error) {
    console.log(error);
    return handleError(error as AxiosError);
  }
};

export const getDetailsById = async (id: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const response = await httpClinet.get(
        `KM_MOBILE_SERVICE/shop-aedev-license/details/${id}`,
        {
          headers: {
            kmmv: '2023.3.1',
            authorization: 'Basic ' + accessToken,
          },
        },
      );

      return handleResponse(response);
    } else {
      const httpResponse = {
        status: HttpStatus.UNAUTHORIZED,
        data: undefined,
      };

      return httpResponse;
    }
  } catch (error) {
    console.log(error);
    return handleError(error as AxiosError);
  }
};

export const uploadAttachment = async (
  image: Asset,
  item: EntryBO,
  folderId: string,
) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        name: image.fileName || 'photo.jpg',
        type: image.type,
      });
      formData.append(
        'request_id',
        item.content.properties.packagesadvertisement_requerequest_number,
      );
      formData.append(
        'request_number',
        item.content.properties.packagesadvertisement_requeid,
      );
      formData.append('document_type_code', 1);
      formData.append('document_type', 'طلب خطى من الجهة الطالبة الترخيص');
      formData.append('folderId', folderId);

      const response = await httpClinet.post(
        'KM_MOBILE_SERVICE/shop-aedev-license/attachment/upload',
        formData,
        {
          headers: {
            kmmv: '2023.3.1',
            authorization: 'Basic ' + accessToken,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return handleResponse(response);
    } else {
      const httpResponse = {
        status: HttpStatus.UNAUTHORIZED,
        data: undefined,
      };

      return httpResponse;
    }
  } catch (error) {
    console.log(error);
    return handleError(error as AxiosError);
  }
};

export const deleteAttachmentUsingId = async (id: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const response = await httpClinet.delete(
        `KM_MOBILE_SERVICE/shop-aedev-license/attachment/delete?id=${id}`,
        {
          headers: {
            kmmv: '2023.3.1',
            authorization: 'Basic ' + accessToken,
          },
        },
      );

      return handleResponse(response);
    } else {
      const httpResponse = {
        status: HttpStatus.UNAUTHORIZED,
        data: undefined,
      };

      return httpResponse;
    }
  } catch (error) {
    console.log(error);
    return handleError(error as AxiosError);
  }
};

export const updateTaskasCompleted = async (body: CompleteRequestBO) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const response = await httpClinet.post(
        'KM_MOBILE_SERVICE/app/task/complete',
        body,
        {
          headers: {
            kmmv: '2023.3.1',
            authorization: 'Basic ' + accessToken,
          },
        },
      );

      return handleResponse(response);
    } else {
      const httpResponse = {
        status: HttpStatus.UNAUTHORIZED,
        data: undefined,
      };

      return httpResponse;
    }
  } catch (error) {
    console.log(error);
    return handleError(error as AxiosError);
  }
};

const handleResponse = (response: AxiosResponse) => {
  const httpResponse = {
    status: HttpStatus.FAILED,
    data: undefined,
  };

  if (response.status >= 200 || response.status <= 299) {
    httpResponse.data = response.data;
    httpResponse.status = HttpStatus.SUCCESS;
    return httpResponse;
  }
  if (response.status === 401) {
    httpResponse.status = HttpStatus.UNAUTHORIZED;
    return httpResponse;
  }
  if (response.status === 404) {
    httpResponse.status = HttpStatus.NOTFOUND;
    return httpResponse;
  }
  if (response.status === 500) {
    httpResponse.status = HttpStatus.SERVERRROR;
    return httpResponse;
  }

  return httpResponse;
};

const handleError = (response: AxiosError) => {
  const status = (response.response?.data as any).status;

  const httpResponse = {
    status: HttpStatus.FAILED,
    data: undefined,
  };

  if (status === 401) {
    httpResponse.status = HttpStatus.UNAUTHORIZED;
    return httpResponse;
  }

  if (status === 404) {
    httpResponse.status = HttpStatus.NOTFOUND;
    return httpResponse;
  }

  if (response.status === 500) {
    httpResponse.status = HttpStatus.FAILED;
    return httpResponse;
  }

  return httpResponse;
};
