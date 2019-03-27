import axios from 'axios'
import qs from 'qs'

const baseURL = ''

export default function httpRequest (options) {
  options.method = options.method || 'get'
  const ajaxObj = {
    method: options.method,
    baseURL: options.baseURL || baseURL,
    url: options.url,
    timeout: options.timeout || 30000,
    loading: options.loading || false,
    headers: {
      'Content-type': options.type === 'json'
        ? 'application/json;charset=UTF-8'
        : 'application/x-www-form-urlencoded',
      // 'Authorization': getToken() || undefined
    },
    params: options.method.toLowerCase() === 'get'
      ? options.data
      : undefined,
    data: options.method.toLowerCase() !== 'get'
      ? options.type === 'json'
        ? JSON.stringify(options.data)
        : qs.stringify(options.data)
      : undefined
  }
  return new Promise((resolve, reject) => {
    axios(ajaxObj).then(res => {
      // code200,把data.data传入回调，拿不到data.msg
      // resolve(res.data)
      // return
      if (res.data.resCode === 0) {
        resolve(res.data.resData)
      } else {
        // code!==200,弹出data.msg
        if (res.data.resMsg) {
          // 错误处理
        }
        reject(res.data)
      }
    }, err => {
      reject(err)
    })
  })
}

export const fileRequest = function(options) {
  options.method = options.method || 'post'
  const ajaxObj = {
    method: options.method,
    baseURL: options.baseURL || baseURL,
    url: options.url,
    timeout: options.timeout || 300000,
    headers: {
      // 'Content-type': 'application/json;charset=UTF-8'
      'Authorization': options.token || undefined
    },
    params: options.method.toLowerCase() === 'get' ? options.data : undefined,
    data: options.method.toLowerCase() !== 'get' ? options.data : undefined,
    responseType: 'blob'
  }
  return new Promise((resolve, reject) => {
    axios(ajaxObj).then(res => {
      const data = res.data
      if (!data) {
        return
      }
      let fileName = res.headers['content-disposition']
      if (fileName && fileName.length >= 2) {
        fileName = fileName.split('=')[1]
      }
      fileName = decodeURIComponent(fileName)
      if (window.navigator.msSaveOrOpenBlob) {
        // 兼容ie11
        try {
          const blobObject = new Blob([data])
          window.navigator.msSaveOrOpenBlob(blobObject, fileName)
        } catch (e) {
          console.log(e)
        }
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      resolve()
    }, err => {
      reject(err)
    }).catch(function() {
      console.log('promise reject err')
    })
  })
}

export const imgRequest = function(options) {
  options.method = options.method || 'get'
  const ajaxObj = {
    method: options.method,
    baseURL: options.baseURL || baseURL,
    url: options.url,
    timeout: options.timeout || 30000,
    headers: {
      // 'Content-type': 'application/json;charset=UTF-8'
      'Authorization': options.token || undefined
    },
    params: options.method.toLowerCase() === 'get' ? options.data : undefined,
    data: options.method.toLowerCase() !== 'get' ? options.data : undefined,
    responseType: 'blob'
  }
  return new Promise((resolve, reject) => {
    axios(ajaxObj).then(res => {
      const data = res.data
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      resolve(url)
    }, err => {
      reject(err)
    }).catch(err => {
      console.log(err)
    })
  })
}
