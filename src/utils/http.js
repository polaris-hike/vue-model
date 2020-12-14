import axios from 'axios'
import router from '../router';import {Message} from "element-ui";
const http = axios.create({
  timeout: 180000,
  baseURL: 'http://testa.shenim.cn',
});
http.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(JSON.stringify(error).indexOf('423') > 0){		router.push("/login");
    }
    return Promise.reject(error);
  });

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}, addTimeStamp) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: {
        ...params,
      }
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return http.post(url, data)
    .then(response => {
      return Promise.resolve(response.data);
    }, err => {
      return Promise.reject(err);
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    http.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      });
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    http.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      });
  });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = { data: {} }) {
  return new Promise((resolve, reject) => {
    http.delete(url, { data })
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      });
  });
}
