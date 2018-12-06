const LocalEvent = function (item) {
  this.get = function () {
    let obj = localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
    if (obj.time) {
      if ((new Date().getTime() - obj.startTime) > obj.time) {
        this.clear()
        alert('登录过期，请重新登录')
      } else {
        return obj.val
      }
    } else {
      return obj
    }
  }
  this.set = function (obj) {
    localStorage.setItem(item, JSON.stringify(obj))
  }
  this.setWithTime = function (obj, time) {  // 自行封装过期时间
    let startTime = new Date().getTime()
    let objWithTime = {
      val: obj,
      time: time,
      startTime: startTime
    }
    this.set(objWithTime)
  }
  this.clear = function () {
    localStorage.removeItem(item)
  }
}

export const localUser = new LocalEvent('vip-user')