import Taro from "@tarojs/taro";

export const showToast = async (title: any = '成功', icon: any = 'none', duration = 2000) => {
  return new Promise((resolve, reject) => {
    Taro.showToast({
      title,
      icon,
      duration,
      mask: true,
      success: function(res) {
        setTimeout(() => {
          resolve(res)
        }, 1500)
      },
      fail: function(res) {
        setTimeout(() => {
          reject(res)
        }, 1500)
      }
    })
  })
}

// 弹框，其中showCancel由参数hideCancel决定，hideCancel为true则隐藏取消按钮
export const showModal = async (params?: any, success?: any, fail?: any, complete?: any) => {
  return Taro.showModal({
    title: params['title'] || '',
    content: params['content'] || '',
    confirmText: params['confirmText'] || '确认',
    cancelText: params['cancelText'] || '取消',
    showCancel: !params['hideCancel'],
    success,
    fail,
    complete
  })
}

export const showLoading = async (status: boolean, title = '加载中' ) => {
  if (status) {
    Taro.showToast({
      title,
      icon: 'loading',
      duration: 30000,
      mask: true
    })
    // Taro.showLoading({title: '加载中'})
  } else {
    // Taro.hideLoading()
    Taro.hideToast()
  }
}