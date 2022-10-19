import Taro from '@tarojs/taro'
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import "./app.less";

import configStore from './store';

const store = configStore()

// 拦截器 start
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  let header = {
    'ClientCode': 'wx_applet',
  }
  Object.assign(requestParams.header, header)
  return chain.proceed(requestParams)
    .then(res => {
      console.log('请求结果', res)
      let statusCode = res['statusCode']
      if (statusCode >= 200 && statusCode < 300) {
        return res['data']
      } else {
        // 请求异常处理
        const MESSAGE = {
          200: '服务器成功返回请求的数据。',
          201: '新建或修改数据成功。',
          202: '一个请求已经进入后台排队（异步任务）。',
          204: '删除数据成功。',
          400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
          401: '用户没有权限（令牌、用户名、密码错误）。',
          403: '用户得到授权，但是访问是被禁止的。',
          404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
          406: '请求的格式不可得。',
          410: '请求的资源被永久删除，且不会再得到的。',
          422: '当创建一个对象时，发生一个验证错误。',
          500: '服务升级中,请稍后再试',
          502: '网关错误。',
          503: '服务不可用，服务器暂时过载或维护。',
          504: '网关超时。'
        }
        switch (statusCode) {
          case 401:
          case 404:
          case 500:
            // Taro.showToast({title: MESSAGE[statusCode], icon: 'none'})
            break
          default:
            break
        }
        let code = statusCode || -1
        let msg = MESSAGE[code] || '服务不可用，服务器暂时过载或维护。'
        return {code, msg}
      }
    }, err => {
      console.log('err', err)
      let errMsg = err['errMsg']
      if (errMsg === 'request:fail ') {
        return {code: -2, msg: '服务不可用，服务器暂时过载或维护。'}
      } else {
        return {code: -3, msg: '未知错误'}
      }
    })
}

Taro.addInterceptor(interceptor)

// 日志拦截器添加
Taro.addInterceptor(Taro.interceptors.logInterceptor)

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App;
