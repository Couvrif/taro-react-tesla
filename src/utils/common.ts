import Taro, { DependencyList, useEffect } from '@tarojs/taro'
import { get as getGlobalData, set as setGlobalData } from './global_data'
import * as config from './config'
import * as message from './message'
import api from './api'
import QQMapWX from './qqmap-wx-jssdk'
import userAction from '../actions/user.action'

// const QQMapWX = require('./qqmap-wx-jssdk.js')

// 下载图片
export const downLoadImg = (imgurl, msg, wx) => {
  return new Promise((resolve, reject) => {
    // let that = this
    // util.showToast(msg + 'download...')
    console.log(msg + 'download...')
    wx.downloadFile({
      url: imgurl,
      complete: function (res) {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath)
        } else {
          console.log('downloadstatusCode', res)
          reject(new Error(res))
        }
      },
      fail: function (res) {
        console.log('downloadFilefail', res)
      }
    })
  })
}

export const promiseImage = (url) => {
  return new Promise(function (resolve) {
    resolve(url)
  })
}

/*获取当前页url*/
export const getCurrentPageUrl = () => {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const url = currentPage.route
  return url
}

export const getSysteminfo = (wx) => {
  let device
  try {
    const deviceInfo = wx.getSystemInfoSync()
    device = JSON.stringify(deviceInfo)
  } catch (err) {
    console.error('not support getSystemInfoSync api', err.message)
  }
  return device
}

export function useAsyncEffect (effect: () => Promise<any>, deps?: DependencyList) {
  useEffect(() => {
    effect()
  }, deps)
}

export const hasLogin = () => {
  return getGlobalData('token').length > 0
}


export const uploadFile = async (url, filePath, formData = {}, header = {}, name = 'files') => {
  const fileUploadUrl = `${config.baseUrl}/api/${url}`
  return Taro.uploadFile({
    url: fileUploadUrl,
    filePath: filePath,
    name: name,
    formData: formData,
    header: header
  })
}

//上传图片
export async function uploadMultiFile(filePaths, params: any = {}) {
  const fileUploadUrl = `file-upload/uploadWechat/${params.masterId}`
  if (Array.isArray(filePaths)) {
    for (let i = 0; i < filePaths.length; i++) {
      const path = filePaths[i].url || filePaths[i]
      const uploadRes = await uploadFile(fileUploadUrl, path, params)
      if (uploadRes['statusCode'] === 201) {
        continue
      } else {
        Taro.showToast({
          title: `${uploadRes['msg']}`,
          icon: 'none',
          duration: 3000,
          mask: true
        })
      }
    }
  }
}


export const deleteFile = async (id) => {
  const url = `file-upload/${id}`
  return api.delete(url)
}

export const createSelector = async () => {
  const date = new Date()
  const year = date.getFullYear()
  // year = year - 1
  const years = Array.from(Array(20), (v, k) => String(year + k))
  const months = Array.from(Array(12), (v, k) => k > 8 ? String( k + 1) : '0' + (k + 1))
  const days = Array.from(Array(31), (v, k) => k > 8 ? String(k + 1) : '0' + (k + 1))
  const hours = Array.from(Array(24), (v, k) => k > 9 ? String(k) : '0' + k)
  // let minuters = Array.from(Array(60), (v,k) => k > 9 ? k : '0' + k)
  const minuters = ['00', '15', '30', '45']
  return [years, months, days, hours, minuters]
}

// export const formatSponsor = (sponsors) => {
//   sponsors.forEach((item) => {
//     if (item.type === 'BUSINESS') {
//       item.lable = item.name + ' ' + item.unisc_code;
//     } else {
//       if (!!item.phone) {
//         item.lable = item.name + ' ' + item.phone.substr(0, item.phone.length - 8) + '****'
//           + item.phone.substr(item.phone.length - 4, item.phone.length);
//       } else {
//         item.lable = item.name;
//       }
//     }
//   })
//   return sponsors
// }

// 获取用户信息
export const getUserInfo = async() => {
  let user = {}
  try {
    const res = await Taro.getStorage({key: 'user'})
    user = res['data']
  } catch (e) {
  }
  return user
}

// 获取token
export const getToken = async() => {
  let token = ''
  try {
    const res = await Taro.getStorage({key: 'token'})
    token = res['data'] || ''
  } catch (e) {
  }
  return token
}

/**
 * 下载小程序新版本并重启应用
 */
export const downLoadAndUpdate = (updateManager) => {
  Taro.showLoading({
    title: '下载中...',
    mask: true
  })
  updateManager.onUpdateReady(function () {
    console.log('下载成功！')
    Taro.hideLoading()
    updateManager.applyUpdate()
  })
  updateManager.onUpdateFailed(function () {
    console.log('下载失败！')
    Taro.hideLoading()
    Taro.showModal({
      title: '已经有新版本了哟~',
      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      showCancel: false
    })
  })
}

// 自动更新
export const autoUpdate = () => {
  // 获取小程序更新机制兼容
  if (Taro.canIUse && Taro.canIUse('getUpdateManager')) {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      console.log('是否需要更新', res.hasUpdate)
      if (res.hasUpdate) {
        Taro.showModal({
          title: '更新提示',
          content: '人人优佳小程序需要重启以使用最新功能',
          showCancel: false,
          complete: function() {
            downLoadAndUpdate(updateManager)
          }
        })
      }
    })
  } else {
    Taro.showModal({
      title: '提示',
      content: '当前微信版本过低，无法自动升级，请升级到最新微信版本后重试。',
      showCancel: false
    })
  }
}

// 更新Token
export const updateToken = async() => {
  // 微信登录
  const formData = {}
  try {
    const loginMsg = await Taro.login()
    formData['code'] = loginMsg['code']
  } catch (e) {
    return false
  }
  formData['type'] = 2
  const sysInfo = await Taro.getSystemInfo()
  formData['sysInfo'] = sysInfo
  const res = await userAction.login(formData)
  const code = res['code']
  if (code === 0) {
    setGlobalData('userStatus', 0)
    setGlobalData('token', res['token'])
    await Taro.setStorage({
      key: 'token',
      data: res['token']
    })
  }
}

// 检查批量上传的图片
export const checkMultiFile = async (filePaths, masterId, params = {}) => {
  const fileUploadUrl = `file-upload/img`
  if (Array.isArray(filePaths)) {
    let flag = 'pass'
    for (let i = 0; i < filePaths.length; i++) {
      const path = filePaths[i]
      const result = await uploadFile(fileUploadUrl, path, params)
      const imgCheckResult = JSON.parse(result['data'])
      console.log('检查结果结果', imgCheckResult)
      if (imgCheckResult['code'] !== 0) {
        if (imgCheckResult['code'] === 1) {
          flag = 'fail'
        } else if (imgCheckResult['code'] === 2) {
          flag = 'toAudit'
        }
        break
      }
    }
    return flag
  }
  return 'pass'
}

export const initMap = () => {
  const key = config.mapKey
  const map = new QQMapWX({key})
  return map
}

// 经纬度转地址
// latitude: 纬度， longitude: 经度
export const geo2Address = (latitude, longitude) => {
  console.log('geo2Address调用腾讯接口')
  const map = initMap()
  const location = {latitude, longitude}
  return new Promise((resolve, reject) => {
    map.reverseGeocoder({
      location,
      success: function(res) {
        console.log('腾讯接口调用成功', res)
        if (res.status === 0) {
          resolve(res.result)
        }
      },
      fail: function(res) {
        console.log('腾讯接口调用失败', res)
        reject(res)
      }
    })
  })
}

// 地址转经纬度
export const address2Geo = (address) => {
  const map = initMap()
  return new Promise((resolve, reject) => {
    map.geocoder({
      address: address,
      success: function(res) {
        resolve(res)
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}

// 从缓存中获取附近社区
export const getNearCommunity = async() => {
  const key = 'nearOrgs'
  let community = []
  try {
    const res = await Taro.getStorage({key})
    community = res['data']
  } catch (e) {
    community = []
  }
  return community
}

// 根据地址打开地图并且定位？
export const openMap = (address) => {
  const map = initMap()
  map.geocoder({
    address: address,
    success: function(res) {
      console.log('success', res)
      const data = res.result
      const latitude = data.location.lat
      const longitude = data.location.lng
      Taro.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 18,
        name: address,
        address: address,
        success: function (successRes) {
          console.log('打开地图成功', successRes)
        },
        fail: function (error) {
          console.error('打开地图失败', error)
          message.showToast('打开地图失败')
        }
      })
    },
    fail: function(res) {
      console.log('fail', res)
    }
  })
}

// 页面跳转
export const navigate = (url) => {
  Taro.navigateTo({url: url})
}

export const redirect = (url) => {
  Taro.redirectTo({url: url})
}

export const reLaunchTo = (url) => {
  Taro.reLaunch({url: url})
}

export const navigateBack = (number: number) => {
  Taro.navigateBack({ delta: number })
}