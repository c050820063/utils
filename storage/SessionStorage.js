import { Storage } from './Storage.js'

class SessionStorage extends Storage {
  _get(key) {
    const value = sessionStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch(e) {
      return value
    }
  }
  _set(key, value) {
    if (this.getType(value) === 'Object') {
      sessionStorage.setItem(key, JSON.stringify(value))
    } else {
      sessionStorage.setItem(key, value)
    }
  }
}

export default new SessionStorage()