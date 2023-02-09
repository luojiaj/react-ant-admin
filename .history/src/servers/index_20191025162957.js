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

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  const data = response.data
  if (!data && data != 0) {
    throw err
  }
  return response
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '参数错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  return Promise.reject(err)
})


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