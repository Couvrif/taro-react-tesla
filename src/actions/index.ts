import Taro from "@tarojs/taro"

export function createAction(actionType) {
  return (payload) => ({
    type: actionType,
    payload
  })
}

export function createApiAction(actionType, func = param => { console.log(param) }) {
  return (
    params = {},
    callback = { success: (res) => {}, failed: error => {console.error('error', error)} },
    customActionType = actionType
  ) => async (dispatch) => {
    try {
      dispatch({ type: `${customActionType}_request`, params })
      const data = await func(params)
      dispatch({ type: customActionType, params, payload: data })
      callback.success && callback.success({ payload: data })
      return data
    } catch (e) {
      dispatch({ type: `${customActionType}_failure`, params, payload: e })
      callback.failed && callback.failed({ payload: e })
      if (e.includes('Unauthorization')) {
        const pages = Taro.getCurrentPages()
        const currentPage = pages[pages.length - 1]
        const url = currentPage.route
        const path = url
        if (path !== 'pages/login/get_wechat_phone') {
          Taro.redirectTo({
            url: `/pages/login/get_wechat_phone?url=${path}`
          })
        }
      }
    }
  }
}

