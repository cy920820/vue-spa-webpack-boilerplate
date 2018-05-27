/**
 * 使用axios库与后端进行HTTP通信 (https://github.com/axios/axios)
 */

import axios from 'axios'

// 允许跨域情况下携带cookie
axios.defaults.withCredentials = true
// 设置超时时间
axios.defaults.timeout = 100000
// custom headers - 标识这是一个ajax请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent

  return config
}, function (error) {
  // Do something with request error

  return Promise.reject(error)
})

// Add filter retcode
let isOk = (retcode) => {
  return [
    '2000000'
  ].indexOf(retcode) > -1
}

// Add a response interceptor
axios.interceptors.response.use(response => {
  // Do something with response data

  // 获取返回的数据
  let resp = response.data
  let retcode = resp.retcode
  let message = resp.message

  // 满足filter retcode则返回相应data
  if (isOk(retcode)) {
    let data = resp.data || resp.data.data // 拿到真实的数据
    data.retcode = retcode
    data.message = message
    return data
  }
  else {
    throw Error(response.data.msg || '服务器异常')
  }
}, error => {
  // Do something with response error

  return Promise.reject(error)
})

export default axios
