const chainResult = function (instance, obj) {
  return instance._chain ? _.chain(obj) : obj
}
const _toString = Object.prototype.toString

function createJudgeFn (type) {
  return function (obj) {
    return _toString.call(obj) === `[object ${type}]`
  }
}

function _ (obj) {
  if (!(this instanceof _)) return new _(obj)
  if (obj instanceof _) return obj
  this._wrapped = obj
}
_.debounce = function (fn, time = 100) {
  return function () {
    clearTimeout(fn.timer)
    fn.timer = setTimeout(fn, time)
  }
}
_.throttle = function (fn, time = 50) {
  return function () {
    !fn.timer && (fn.timer = setTimeout(function () {
      fn()
      fn.timer = false
    }, time))
  }
}
_.isArrayOrLike = function (obj) {
  const len = obj.length
  return obj && typeof obj === 'object' && isFinite(len) && len >= 0 && len === Math.floor(len)
}
_.isFunction = function (obj) {
  return typeof obj === 'function' || false
}
_.functions = function (obj) {
  return Object.keys(obj).filter(name => _.isFunction(obj[name]))
}
_.chain = function (obj) {
  const instance = _(obj)
  instance._chain = true
  return instance
}
_.isObject = function (obj) {
  return obj !== null && typeof obj === 'object'
}
_.isPlainObject = createJudgeFn('Object')
_.each = function (obj, callback) {
  let index = 0
  if (_.isArrayOrLike(obj)) {
    for (let i = 0, len = obj.length; i < len; i++) {
      const res = callback.call(obj[i], obj[i], i, obj)
      if (res === false) break
    }
  } else {
    for (let key in obj) {
      const res = callback.call(obj[key], obj[key], key, index++, obj)
      if (res === false) break
    }
  }
  return obj
}
_.mixin = function (obj) {
  _.each(_.functions(obj), function (name) {
    const func = _[name] = obj[name]
    _.prototype[name] = function () {
      const args = this._wrapped
      return chainResult(this, func.apply(_, [args, ...arguments]))
    }
  })
  return _
}
_.prototype.value = function () {
  return this._wrapped
}
_.mixin(_)
export default _
