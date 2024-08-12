import axios, {AxiosError, AxiosResponse} from 'axios';
import {LoginUserBO} from '../BOs/LoginUserBO';
import DeviceInfo from 'react-native-device-info';
import base64 from 'base-64';
import {HttpStatus} from '../BOs/HttpStatus';

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
