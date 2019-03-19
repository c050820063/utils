import { Storage } from './Storage.js'

class SessionStorage extends Storage {
  _get(key) {
    const value = window.sessionStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch(e) {
      return value
    }
  }
  _set(key, value) {
    if (this.getType(value) === 'Object') {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } else {
      window.sessionStorage.setItem(key, value)
    }
  }
  _delete (key) {
    window.sessionStorage.removeItem(key)
  }
  _deleteAll () {
    window.sessionStorage.clear()
  }
}

export default new SessionStorage()