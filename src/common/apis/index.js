import axios from 'axios'

import AskPost from './AskPost'

const ol = 'http://h5.rup-china.com/hanhui/public/index.php/api/';
const lc = 'http://192.168.1.12/hanhui/public/index.php/api/'
const host = ol
// 实例化 ajax请求对象
const ajaxinstance = axios.create({
  baseURL: host,
  timeout: 50000,
  // withCredentials: true,
  headers: {
    // responseType: 'JSON',
    // 'Content-Type': 'application/json'
  }
})

// 添加拦截器，处理 公用请求参数，和通用请求头部
ajaxinstance
  .interceptors
  .request
  .use((config) => {
    // TODO
    console.log(config);
    
    return config
  }, (error) => {
    Promise.reject(error)
  })

// 请求响应拦截器
ajaxinstance
  .interceptors
  .response
  .use((response) => {
    // TODO
    return response.data
  }, (error) => {
    return Promise.reject(error)
  })

/**
 * [API api接口封装]
 * @type {Object}
 */
const API = {
  ...AskPost(ajaxinstance),
}

export default API
