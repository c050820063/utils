import { Storage } from './Storage'

class CookieStorage extends Storage {
  constructor(expires) {
    super()
    this.expires = expires || 30
  }
  _get (key) {
    let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
    let arr = document.cookie.match(reg)
    let value = arr && unescape(arr[2])
    if (super.isJSON(value)) {
      return JSON.parse(value)
    }
    return value
  }
  _set (key, value) {
    let now = new Date()
    now.setTime(now.getTime() + this.expires * 24 * 60 * 60 * 1000)
    document.cookie = `${key}=${escape(value)};expires=${now.toUTCString()};path=/`
  }
  _delete (key) {
    let value = this.get(key)
    document.cookie = value && `${key}=${escape(value)};expires=${new Date(0).toUTCString()}`
  }
  _deleteAll () {
    let keys = document.cookie.match(/[^ =;]+(?=\\=)/g)
    if (keys) {
      for (let index = keys.length; index > 0; index--) {
        document.cookie = `${keys[index]}=0;expires=${new Date(0).toUTCString()}`
      }
    }
  }
}

export default new CookieStorage()
