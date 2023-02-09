import Axios from 'axios'
import config from '@/config'

const axios = Axios.create();
const CancelToken = Axios.CancelToken;
const baseURL = config.url;
let cancel_list = [];

// axios默认配置
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 180000; //3min

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import {
  isObject
} from 'lodash';
axios.interceptors.request.use(
  config => config,
  error => {
    Promise.reject(error);
  },
);
/* eslint consistent-return: off */

// respone拦截器
axios.interceptors.response.use(
  response => {
    if (error.status) {
      console.log(status)
    } else {
      return response;
    }
  },
  error => Promise.reject(error),
);


// 该方法会取消所有正在进行的请求
export const ajax_abort_all = () => {
  cancel_list.forEach(item => {
    item();
  });
  cancel_list = [];
};

export const ajax_all = (method, url, params, data) => {
  return axios({
    method,
    url,
    params,
    data,
    cancelToken: new CancelToken(function (cancel) {
      cancel_list.push(cancel);
    })
  }).then(response => {
    return Promise.resolve(response)
  }).catch(error => {
    return Promise.reject(error)
  });
};

export const ajax_get = (url, params) => {
  return ajax_all('get', url, params);
};

export const ajax_post = (url, data) => {
  return ajax_all('post', url, {}, data);
};

export const ajax_put = (url, data) => {
  return ajax_all('put', url, {}, data);
};

export const ajax_delete = (url, data) => {
  return ajax_all('delete', url, {}, data);
};