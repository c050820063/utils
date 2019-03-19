/** 获取一定范围内的日期(配合iosSelect使用)
 * @param startYear: 当前年份前xx年
 * @param startDay: 当前天数前xx天
 * @param endYear: 当前年份后xx年
 * @param endDay: 当前天数后xx天
 * @param startType: false 不限制开始月份(天数) true 限制开始月份(天数)
 * @param endType: false 不限制结束月份(天数) true 限制结束月份(天数)
 */
class GetDate {
  constructor({ startYear = 70, startDay = 1, endYear = 0, endDay = 0, startType = false, endType = false } = {}) {
    let nowDate = new Date()
    let start = (new Date(`${nowDate.getFullYear() - startYear}/${nowDate.getMonth() + 1}/${nowDate.getDate()}`)).getTime() + startDay * 24 * 60 * 60 * 1000 // 上限
    this.startYear = new Date(start).getFullYear()
    this.startMonth = new Date(start).getMonth() + 1
    this.startDay = new Date(start).getDate()
    let getMonth = (nowDate.getMonth() + 1 + (endYear % 1 * 12))
    let isCount = getMonth > 12
    let newMonth = isCount ? getMonth - 12 : getMonth
    let end = (new Date(`${nowDate.getFullYear() + Math.floor(endYear) + (isCount ? 1 : 0)}/${newMonth}/${nowDate.getDate()}`)).getTime() - endDay * 24 * 60 * 60 * 1000 // 下限
    this.endYear = new Date(end).getFullYear()
    this.endMonth = new Date(end).getMonth() + 1
    this.endDay = new Date(end).getDate()
    this.startType = startType
    this.endType = endType
  }
  getDateList = (s = 1, e = 12) => {
    let list = []
    for (let i = s; i <= e; i++) {
      i = i < 10 ? `0${i}` : i
      list.push({
        id: i + '',
        value: i
      })
    }
    return list
  }
  remainingDays = (year, month, startDay = 1) => {
    if (/^(01|03|05|07|08|10|12)$/.test(month)) {
      return (this.getDateList(startDay, 31))
    } else if (/^(04|06|09|11)$/.test(month)) {
      return (this.getDateList(startDay, 30))
    } else if (/^02$/.test(month)) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return (this.getDateList(startDay, 29))
      } else {
        return (this.getDateList(startDay, 28))
      }
    } else {
      console.log(`${month}-月份不合法`)
      // throw new Error(`${month}-月份不合法`)
    }
  }
  // 年
  getYear = (callback) => {
    callback(this.getDateList(this.startYear, this.endYear))
  }
  // 月
  getMonth = (year, callback) => {
    if (+year === this.startYear) {
      callback(this.startType ? this.getDateList(this.startMonth) : this.getDateList())
    } else if (+year === this.endYear) {
      callback(this.endType ? this.getDateList(1, this.endMonth) : this.getDateList())
    } else {
      callback(this.getDateList())
    }
  }
  // 日
  getDays = (year, month, callback) => {
    if (+year === this.startYear && +month === this.startMonth) {
      callback(this.startType ? this.remainingDays(year, month, this.startDay) : this.getDateList())
    } else if (+year === this.endYear && +month === this.endMonth) {
      callback(this.endType ? this.getDateList(1, this.endDay) : this.remainingDays(year, month))
    } else {
      callback(this.remainingDays(year, month))
    }
  }
}
export default GetDate
