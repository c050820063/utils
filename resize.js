import _ from './my_underscore.js'
export default function ({ documentElement: html }, w) {
  const eventName = 'orientationchange' in w ? 'orientationchange' : 'resize'
  const resize = function () {
    const { style, clientWidth } = html
    style.fontSize = clientWidth < 480 ? `${100 * clientWidth / 375}px` : `128px`
  }
  w.addEventListener(eventName, _.debounce(resize))
  resize()
}
