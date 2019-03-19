import EXIF from 'exif-js'
export default function canvasDataURL (e, callback) {
  const file = e.target.files[0]
  const reader = new FileReader()
  const isNeddCompress = file.size / 1024 / 1024
  let Orientation = null
  // if (isNeddCompress > 10) return window.$alert.show('图片过大，请重新选择！')
  EXIF.getData(file, function () {
    Orientation = EXIF.getTag(this, 'Orientation')
  })
  if (file) reader.readAsDataURL(file)
  reader.onload = (e) => {
    const img = new Image()
    img.src = e.target.result
    const imgType = e.target.result.split(';')[0].split(':')[1]
    // if (imgType !== 'image/jpeg' && imgType !== 'image/jpg' && imgType !== 'image/png') return window.$alert.show('您上传的照片格式错误,请重新选择！')
    const dirName = imgType.split('/')[1]
    img.onload = function () {
      let w = this.width
      let h = this.height
      if (w > h && w > 1024) {
        w = 1024
        h = Math.ceil(1024 * this.height / this.width)
      } else if (w < h && h > 1024) {
        w = Math.ceil(1024 * this.width / this.height)
        h = 1024
      }
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = w
      canvas.height = h
      switch (Orientation) {
        case 3:
          ctx.rotate(Math.PI)
          ctx.drawImage(this, -w, -h, w, h)
          break
        case 6:
          canvas.width = h
          canvas.height = w
          ctx.rotate(Math.PI / 2)
          ctx.drawImage(this, 0, -h, w, h)
          break
        case 8:
          canvas.width = h
          canvas.height = w
          ctx.rotate(Math.PI * 3 / 2)
          ctx.drawImage(this, -w, 0, w, h)
          break
        default:
          ctx.drawImage(this, 0, 0, w, h)
      }
      setTimeout(() => {
        const base64 = canvas.toDataURL(imgType)
        callback(base64, dirName)
      }, 80)
    }
  }
}
