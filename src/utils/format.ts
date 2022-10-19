import Taro from '@tarojs/taro'

export const promisify = (func) => {
  // 返回一个新的function
  return function (ctx1) {
    // 初始化this作用域
    const ctx = ctx1 || this;
    // 新方法返回的promise
    return new Promise((resolve, reject) => {
      // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
      // eslint-disable-next-line prefer-rest-params
      func.call(ctx, ...arguments, function () {
        // 将回调函数中的的第一个参数error单独取出
        // eslint-disable-next-line prefer-rest-params
        let args = Array.prototype.map.call(arguments, item => item);
        const err = args.shift();
        // 判断是否有error
        if (err) {
          reject(err)
        } else {
          // 没有error则将后续参数resolve出来
          args = args.length > 1 ? args : args[0];
          resolve(args);
        }
      });
    })
  };
};

export const isChinese = (str) => {
  if (escape(str).indexOf("%u") < 0) return false
  return true
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const emoj2str = (str) => {
  return unescape(escape(str).replace(/\%uD.{3}/g, ''))
}

export const handleName = (str) => {
  let res = emoj2str(str)
  if (isChinese(res)) {
    res = res.length > 4 ? res.slice(0, 4) + '...' : res
  } else {
    res = res.length > 7 ? res.slice(0, 7) + '...' : res
  }
  return res
}


/*获取当前页url*/
export const getCurrentPageUrl = () => {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const url = currentPage.route
  return url
}

export const logError = (name, action, info) => {
  if (!info) {
    info = 'empty'
  }
  try {
    const deviceInfo = Taro.getSystemInfoSync()
    const device = JSON.stringify(deviceInfo)
    const time = formatTime(new Date())
    console.error(time, name, action, info, device)
  } catch (e) {
    console.error('not support getSystemInfoSync api', e.message)
  }
  // if (typeof action !== 'object') {
  // fundebug.notify(name, action, info)
  // }
  // fundebug.notifyError(info, { name, action, device, time })
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
}

// 数组排序
export const rankArr = (dataArr, compareField, newField = 'sort') => {
  if (Array.isArray(dataArr) && dataArr.length > 0) {
    let sort = 0
    dataArr.forEach((item, index, arr) => {
      if (index > 0) {
        const preVal = arr[index - 1]
        sort = item[compareField] === preVal[compareField] ? sort : index
      }
      item[newField] = sort
    })
  } else {
    dataArr = dataArr.filter((item, index) => {
      item[newField] = index
      return true
    })
  }
  return dataArr
}

// 把普通文本的空格和换行符换成html
export const replaceHtml = (html) => {
  html = html || ''
  html = html.replace(/ /g, '&nbsp;')
  html = html.replace(/\r\n/g, '<br>')
  html = html.replace(/\n/g, '<br>')
  html = html.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
  return html
}

// 把富文本转化成普通文本
export const trunRichTextToText = (richText) => {
  let content = richText.replace(/<.+?>/g, '')
  content = content.replace(/ /ig, '')
  content = content.replace(/\s/ig, '')
  content = content.replace(/&nbsp;/ig, '')
  return content
}

// 时间截取(把带有T的时间，截取出来日期)
export const getDateT = (dateTime) => {
  let index = dateTime.indexOf('T')
  if (index !== -1) {
    dateTime = dateTime.substr(0, index)
  }
  return dateTime
}

// 获取当前时间是周几
export const getDateStr = (dateTime) => {
  dateTime = dateTime.replace(/-/g, '/')
  let date = new Date(dateTime)
  let now = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  let weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let day = date.getDay()
  return weekArr[day]
}

export const findChild = (arr, id) => {
  const result: any = []
  for (let i = 0; i < arr.length; i++) {
    const tree = arr[i]
    const label = tree['name']
    const value = `${tree['id']}=${tree['name']}`
    const obj = {label: label, value: value}
    const children = tree['children']
    if (children) {
      obj['children'] = findChild(children, id)
    }
    result.push(obj)
    if (id === tree['id']) {
      return result
    }
  }
  return result
}

export const getNodes = (arr, name = '', result) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const title = item['name']
    // let title = item['simple_name']
    const value = item['id']
    const parent = name + ' ' + title
    const children = item['children']
    const obj = {name: title, value, parent}
    // if (obj['type'] === '1') {
    //   result.push(obj)
    // }
    result.push(obj)
    if (children) {
      getNodes(children, parent, result)
    } else {
      // result.push(obj)
    }
  }
  return result
}

export const personalFormatTime = (date, format) => {
  const datetime = new Date(date)
  const Nyear = datetime.getFullYear()
  const Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1
  const Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate()
  const Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()
  const Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes()
  const Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds()
  const o = {
    "M+": Nmonth, 		// month
    "d+": Ndate, 			// day
    "H+": Nhour, 			// hour
    "m+": Nminute, 		// minute
    "s+": Nsecond, 		// second
    // "q+": Math.floor((this.getMonth() + 3) / 3), 	// quarter
    // "S": this.getMilliseconds()  	// millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (Nyear + "")
      .substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}


export const timeago = dateTimeStamp => {   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  const minute = 1000 * 60      //把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  // let halfamonth = day * 15
  const month = day * 30
  const now = new Date().getTime()   //获取当前时间毫秒
  const diffValue = now - dateTimeStamp//时间差

  if (diffValue < 0) {
    return
  }
  const minC = diffValue / minute  //计算时间差的分，时，天，周，月
  const hourC = diffValue / hour
  const dayC = diffValue / day
  const weekC = diffValue / week
  const monthC = diffValue / month
  let result
  if (monthC >= 1 && monthC <= 3) {
    result = " " + monthC + " month(s) ago"
  } else if (weekC >= 1 && weekC <= 3) {
    result = " " + weekC + " week(s) ago"
  } else if (dayC >= 1 && dayC <= 6) {
    result = " " + dayC + " day(s) ago"
  } else if (hourC >= 1 && hourC <= 23) {
    result = " " + hourC + " hour(s) ago"
  } else if (minC >= 1 && minC <= 59) {
    result = " " + minC + " minute(s) ago"
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "just now"
  } else {
    const datetime = new Date()
    datetime.setTime(dateTimeStamp)
    const Nyear = datetime.getFullYear()
    const Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1
    const Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate()
    const Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()
    const Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes()
    const Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds()
    result = Nyear + "-" + Nmonth + "-" + Ndate + ' ' + Nhour + ':' + Nminute + ':' + Nsecond
  }
  return result
}