import { Storage } from './Storage.js'

class LocalStorage extends Storage {
  _get(key) {
    const value = window.localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch(e) {
      return value
    }
  }
  _set(key, value) {
    if (this.getType(value) === 'Object') {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.localStorage.setItem(key, value)
    }
  }
  _delete (key) {
    window.localStorage.removeItem(key)
  }
  _deleteAll () {
    window.localStorage.clear()
  }
}

export default new LocalStorage()