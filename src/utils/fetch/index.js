/**
 * @file: index.
 * @intro: 数据请求统一封装.
 */
//导入模块
import axios from 'axios'
// import router from 'src/router'
import { Message } from 'element-ui'
// import store from 'store'
const qs = require('qs')

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    // 创建一个axios实例
    const instance = axios.create({
      // 设置默认根地址
      //  baseURL: server_base_url,
      // 设置请求超时设置
      timeout: 10000,
      // 设置请求时的header text/plain,*/*
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Accept': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json,text/plain,*/*',
        //  'userType': '3'
      }
    })
    instance.interceptors.request.use(options => {
      options.data = qs.stringify(options.data)
      return options
    }, error => {
      Promise.reject(error);
    })
    // 请求处理
    instance(options).then(({data: {code, msg, data, page}}) => {
      console.info(data);
      // 请求成功时,根据业务判断状态
      if (code == 200) {
        resolve({code, msg, data, page})
        return false
      }
      Message.warning(msg)
      reject({code, msg, data})
    }).catch((error) => {
      // 请求失败时,根据业务判断状态
      if (error.response) {
        let resError = error.response
        let resCode = resError.status
        let resMsg = error.message
        Message.error('操作失败！错误原因 ' + resMsg)
        reject({code: resCode, msg: resMsg})
      }
    })
  })
}
