export default function () {
  // 安卓输入框唤醒键盘被覆盖问题
  if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener('resize', function () {
      window.setTimeout(function () {
        document.activeElement.scrollIntoView(true)
      }, 0)
    })
  }
}
