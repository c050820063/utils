import sessionStorage from './storage/SessionStorage'
import localStorage from './storage/LocalStorage'
import cookieStorage from './storage/CookieStorage'

class StorageUtils {
  getItem (key) {
    let value
    if (sessionStorage) {
      value = sessionStorage._get(key)
    } else if (localStorage) {
      value = localStorage._get(key)
    } else {
      value = cookieStorage._get(key)
    }
    return value
  }
  setItem (key, value) {
    if (sessionStorage) {
      sessionStorage._set(key, value)
    } else if (localStorage) {
      localStorage._set(key, value)
    } else {
      cookieStorage._set(key, value)
    }
  }
  removeItem (key) {
    if (sessionStorage) {
      sessionStorage._delete(key)
    } else if (localStorage) {
      localStorage._delete(key)
    } else {
      cookieStorage._delete(key)
    }
  }
  clear () {
    if (sessionStorage) {
      sessionStorage._deleteAll()
    } else if (localStorage) {
      localStorage._deleteAll()
    } else {
      cookieStorage._deleteAll()
    }
  }
}

export let storageUtils = new StorageUtils()
