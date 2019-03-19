import { Storage } from './Storage.js'

class LocalStorage extends Storage {
  _get(key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch(e) {
      return value
    }
  }
  _set(key, value) {
    if (this.getType(value) === 'Object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, value)
    }
  }
}

export default new LocalStorage()