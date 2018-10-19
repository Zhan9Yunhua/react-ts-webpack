import http, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { autorun } from 'mobx';
import { message } from 'antd';
import globalStore from '@/store/global';

export const API = APP_ENV === 'dev' ? 'http://127.0.0.1:8999' : '';

const config: AxiosRequestConfig = {};
config.baseURL = API;

const token = { key: '' };

autorun(() => {
  token.key = globalStore.token;
});

const axios: AxiosInstance = http.create(config);

axios.interceptors.request.use(
  conf => {
    conf.headers.Authorization = token.key;
    return conf;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      if (res.data.code === 110) {
        message.error(res.data.msg);
        return Promise.reject(res.data.msg);
      }
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;

export interface IResponse {
  code: number;
  msg: string;
  data: any;
  token?: string;
}

export interface IAxiosResponse extends AxiosResponse<IResponse> {}