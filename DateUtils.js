class DateUtils {
  isDate (date) {
    return Object.prototype.toString.call(date) === '[object Date]'
  }

  isLeapYear (year) {
    if (+year) {
      return ((+year % 4 === 0 && +year % 100 !== 0) || +year % 400 === 0)
    }
    console.log(`${year} Invalid Year`)
    return false
  }

  paddingDate (dateStr, format) {
    try {
      let date = new Date(dateStr)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      day = day < 10 ? '0' + day : day
      let result = format
      if (!result) {
        result = 'YYYY-MM-DD'
      }
      result = result.replace(/yyyy|YYYY/, year)
      result = result.replace(/mm|MM/, month)
      result = result.replace(/dd|DD/, day)
      return result
    } catch (error) {
      console.log(`${dateStr} Invalid Date String`)
      console.error(error)
      return dateStr
    }
  }

  paddingTime (dateStr, format) {
    try {
      let result = format
      if (!result) {
        result = 'hh:mm:ss'
      }
      let date = new Date(dateStr)
      let hour = date.getHours()
      if (result.indexOf('HH') < 0) {
        if (+hour > 12) {
          hour = +hour - 12
        }
      }
      hour = hour < 10 ? '0' + hour : hour
      let minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      let second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      result = result.replace(/hh|HH/, hour)
      result = result.replace(/mm|MM/, minute)
      result = result.replace(/ss|SS/, second)
      return result
    } catch (error) {
      console.log(`${dateStr} Invalid Date String`)
      console.error(error)
      return dateStr
    }
  }

  padding (dateStr, format) {
    if (format) {
      let dateFormat = format.split(' ')[0]
      let timeFormat = format.split(' ')[1]
      return this.paddingDate(dateStr, dateFormat) + ' ' + this.paddingTime(dateStr, timeFormat)
    }
    return dateStr
  }

  /**
   * @param {date} currentDate 源日期值
   * @param {json} dates 对源日期操作的对象
   * dates 属性有：years, months, days, hours, minutes, seconds.日期相加传入正数，相减传入负数
   */
  setDate (currentDate, dates) {
    if (this.isDate(currentDate)) {
      if (dates) {
        let targetDate = new Date(currentDate)
        /* eslint-disable */
        targetDate.setFullYear(currentDate.getFullYear() + (dates.years && +dates.years || 0))
        targetDate.setMonth(currentDate.getMonth() + (dates.months && +dates.months || 0))
        targetDate.setDate(currentDate.getDate() + (dates.days && +dates.days || 0))
        targetDate.setHours(currentDate.getHours() + (dates.hours && +dates.hours || 0))
        targetDate.setMinutes(currentDate.getMinutes() + (dates.minutes && +dates.minutes || 0))
        targetDate.setSeconds(currentDate.getSeconds() + (dates.seconds && +dates.seconds || 0))
        /* eslint-enable */
        return targetDate
      }
      return currentDate
    }
    console.log(`${currentDate} Invalid Date`)
    return null
  }

  /**
   * @param {date} dateOne 第一个日期
   * @param {date} dateTwo 第二个日期
   * if dateOne > dateTwo result 大于零, if dateOne < dateTwo result 小于零, if dateOne = dateTwo result 等于零
   */
  compareDate (dateOne, dateTwo) {
    if (this.isDate(dateOne) && this.isDate(dateTwo)) {
      return dateOne.getTime() - dateTwo.getTime()
    }
    console.log(`${dateOne} or ${dateTwo} Invalid Date`)
    return false
  }

  /**
   * @param {Date} date 日期
   * @param {String} format 日期格式，HH：24小时制，hh：12小时制
   * @param {String} type 不足十位补0
   */
  dateFormat (date, format, type = false) {
    if (this.isDate(date)) {
      let year = date.getFullYear()
      let month = type ? date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}` : date.getMonth() + 1
      let day = type ? date.getDate() > 9 ? date.getDate() : `0${date.getDate()}` : date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      let result = format
      if (!result) {
        result = 'YYYY-MM-DD HH:mm:ss'
      }
      if (result.indexOf('HH') < 0) {
        if (+hour > 12) {
          hour = +hour - 12
        }
      }
      result = result.replace(/yyyy|YYYY/, year)
      result = result.replace(/MM/, month)
      result = result.replace(/dd|DD/, day)
      result = result.replace(/hh|HH/, hour)
      result = result.replace(/mm/, minute)
      result = result.replace(/ss|SS/, second)
      // result = this.padding(result, format)
      return result
    }
    console.log(`${date} Invalid Date`)
  }

  /**
   * @param {Date} fromDate 起始日期
   * @param {Date} toDate 结束日期
   */
  calculateDateInterval (fromDate, toDate) {
    if (!this.isDate(fromDate) || !this.isDate(toDate)) {
      return null
    }
    if (this.compareDate(fromDate, toDate) > 0) {
      return null
    }
    let days = Math.floor((toDate - fromDate) / 1000 / 60 / 60 / 24)
    let years = toDate.getFullYear() - fromDate.getFullYear()
    if (fromDate.getMonth() > toDate.getMonth()) {
      years--
    } else if (fromDate.getMonth() === toDate.getMonth() && fromDate.getDate() > toDate.getDate()) {
      years--
    }
    return {
      days: days,
      years: years,
    }
  }
}

export default new DateUtils()
