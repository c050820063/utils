import sessionStorage from './storage/SessionStorage'
import localStorage from './storage/LocalStorage'
import cookieStorage from './storage/CookieStorage'

class StorageUtils {
  getItem (key) {
    let value
    if (sessionStorage) {
      value = sessionStorage.get(key)
    } else if (localStorage) {
      value = localStorage.get(key)
    } else {
      value = cookieStorage.get(key)
    }
    return value
  }
  setItem (key, value) {
    if (sessionStorage) {
      sessionStorage.save(key, value)
    } else if (localStorage) {
      localStorage.save(key, value)
    } else {
      cookieStorage.save(key, value)
    }
  }
  removeItem (key) {
    if (sessionStorage) {
      sessionStorage.delete(key)
    } else if (localStorage) {
      localStorage.delete(key)
    } else {
      cookieStorage.delete(key)
    }
  }
  clear () {
    if (sessionStorage) {
      sessionStorage.deleteAll()
    } else if (localStorage) {
      localStorage.deleteAll()
    } else {
      cookieStorage.deleteAll()
    }
  }
}

export let storageUtils = new StorageUtils()
